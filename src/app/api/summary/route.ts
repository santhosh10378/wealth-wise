import { prisma } from '@/lib/prisma';
import { NextJSSuccess } from '@/utils/custom-next-response';
import { tryCatchHandler } from '@/utils/handlers';
import { calculatePercentageChange, fillMissingDays } from '@/utils/number-utils';
import { differenceInDays, parse, subDays } from 'date-fns';
import { NextRequest } from 'next/server';

type PeriodSummary = {
  income: number;
  expenses: number;
  remaining: number;
};

export async function GET(req: NextRequest) {
  return tryCatchHandler('SUMMARY_GET', async (user) => {
    const searchParams = req.nextUrl.searchParams;

    const from = searchParams.get('from') as string;
    const to = searchParams.get('to') as string;
    const accountId = searchParams.get('accountId') as string;

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from ? parse(from, 'yyyy-MM-dd', new Date()) : defaultFrom;
    const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultTo;

    const periodLength = differenceInDays(endDate, startDate);
    const lastPeriodStart = subDays(startDate, periodLength);
    const lastPeriodEnd = subDays(endDate, periodLength);

    // Helper to calculate period summaries
    const calculatePeriodSummary = async (start: Date, end: Date): Promise<PeriodSummary> => {
      const income = await prisma.transaction.aggregate({
        where: { amount: { gt: 0 }, date: { gte: start, lte: end }, account: { userId: user.id, ...(accountId && { id: accountId }) } },
        _sum: { amount: true },
      });

      const expenses = await prisma.transaction.aggregate({
        where: { amount: { lt: 0 }, date: { gte: start, lte: end }, account: { userId: user.id, ...(accountId && { id: accountId }) } },
        _sum: { amount: true },
      });

      return {
        income: income._sum.amount ?? 0,
        expenses: expenses._sum.amount ?? 0,
        remaining: (income._sum.amount ?? 0) - Math.abs(expenses._sum.amount ?? 0),
      };
    };

    const currentPeriod = await calculatePeriodSummary(startDate, endDate);
    const lastPeriod = await calculatePeriodSummary(lastPeriodStart, lastPeriodEnd);

    const incomeChange = calculatePercentageChange(currentPeriod.income, lastPeriod.income);
    const expensesChange = calculatePercentageChange(currentPeriod.expenses, lastPeriod.expenses);
    const remainingChange = calculatePercentageChange(currentPeriod.remaining, lastPeriod.remaining);

    const categories = await prisma.transaction.groupBy({
      by: ['categoryId'],
      _sum: { amount: true },
      where: {
        date: { gte: startDate, lte: endDate },
        account: { userId: user.id, ...(accountId && { id: accountId }) },
      },
      orderBy: { _sum: { amount: 'desc' } },
    });

    // Map the category details to the grouped transactions
    const categoryDetails = await prisma.category.findMany({
      where: {
        id: {
          in: categories.map((c) => c.categoryId),
        },
      },
    });

    const result = categories.map((c) => ({
      ...c,
      category: categoryDetails.find((cat) => cat.id === c.categoryId),
    }));

    const topCategories = result.slice(0, 3).map((cat) => ({
      name: cat.category?.name, // Replace categoryId with actual category name if necessary.
      value: cat._sum.amount,
    }));

    const otherCategories = result.slice(3).map((cat) => ({
      name: cat.category?.name,
      value: cat._sum.amount,
    }));

    const finalCategories = topCategories;

    const otherSum = otherCategories.reduce((sum, current) => {
      if (current.value) {
        return sum + current.value;
      } else {
        return sum;
      }
    }, 0);

    if (otherCategories.length > 0) {
      finalCategories.push({
        name: 'Other',
        value: otherSum,
      });
    }

    // Active days calculation
    const activeDays = await prisma.transaction.groupBy({
      by: ['date'],
      _sum: { amount: true },
      where: { date: { gte: startDate, lte: endDate }, account: { userId: user.id, ...(accountId && { id: accountId }) } },
      orderBy: { date: 'asc' },
    });

    const activeDaysFormatted = activeDays.map((day) => {
      const amount = day._sum.amount ?? 0;
      return {
        date: day.date || new Date(),
        income: amount > 0 ? amount : 0,
        expenses: amount < 0 ? Math.abs(amount) : 0,
      };
    });

    const days = fillMissingDays(activeDaysFormatted, startDate, endDate);

    const data = {
      remainingAmount: currentPeriod.remaining,
      incomeAmount: currentPeriod.income,
      expensesAmount: currentPeriod.expenses,
      remainingChange,
      incomeChange,
      expensesChange,
      categories: finalCategories,
      days,
    };

    return NextJSSuccess(data);
  });
}
