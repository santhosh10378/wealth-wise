import { getCurrentUser } from '@/actions/auth-actions';
import { prisma } from '@/lib/prisma';
import { parse, subDays } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';
import { tryCatchHandler } from '@/utils/handlers';
import { NextJSError, NextJSSuccess } from '@/utils/custom-next-response';

// GET Handler for Transactions
export async function GET(req: NextRequest) {
  return tryCatchHandler('TRANSACTIONS_GET', async (user) => {
    const searchParams = req.nextUrl.searchParams;

    const from = searchParams.get('from') as string;
    const to = searchParams.get('to') as string;
    const accountId = searchParams.get('accountId') as string;

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from ? parse(from, 'yyyy-MM-dd', new Date()) : defaultFrom;
    const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultTo;

    const transactions = await prisma.transaction.findMany({
      where: {
        account: {
          userId: user.id,
          ...(accountId && { id: accountId }),
        },
        date: {
          gt: startDate,
          lt: endDate,
        },
      },
      include: {
        category: true,
        account: true,
      },
    });

    return NextJSSuccess(transactions);
  });
}

// POST Handler for Creating a Transaction
export async function POST(req: NextRequest) {
  return tryCatchHandler('TRANSACTIONS_POST', async (user) => {
    const { amount, payee, date, categoryId, accountId, notes } = await req.json();

    const account = await prisma.financeAccount.findUnique({
      where: {
        userId: user.id,
        id: accountId,
      },
    });

    if (!account) return NextJSError(401, 'Unauthorized');

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        payee,
        date,
        accountId,
        ...(categoryId && { categoryId }),
        ...(notes && { notes }),
      },
    });

    return NextJSSuccess(transaction);
  });
}

// PUT Handler for Deleting Multiple Transactions
export async function PUT(req: NextRequest) {
  return tryCatchHandler('TRANSACTIONS_PUT', async (user) => {
    const body = await req.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) return NextJSError(400, 'Missing or invalid IDs');

    await prisma.transaction.deleteMany({
      where: {
        id: { in: ids },
        account: {
          userId: user.id,
        },
      },
    });

    return NextResponse.json({ message: 'Transactions Deleted Successfully' });
  });
}
