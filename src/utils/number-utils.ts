import { eachDayOfInterval, format, isSameDay, parse, subDays } from 'date-fns';

export const convertAmountFromMiliUnits = (amount: number) => {
  return amount / 1000;
};

export const convertAmountToMiliUnits = (amount: number) => {
  return Math.round(amount * 1000);
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  const change = ((current - previous) / previous) * 100;
  return change;
};

export const fillMissingDays = (activeDays: { date: Date; income: number; expenses: number }[], startDate: Date, endDate: Date) => {
  if (activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const transactionByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });

  return transactionByDay;
};

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export const formatDateRange = (period?: Period) => {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, 'LLL dd, y')} - ${format(defaultTo, 'LLL dd, y')}`;
  }

  if (period?.to) {
    return `${format(period.from, 'LLL dd, y')} - ${format(period.to, 'LLL dd, y')}`;
  }

  return format(period.from, 'LLL dd, y');
};

export const formatPercentage = (value: number, options: { addPrefix?: boolean } = { addPrefix: false }) => {
  const result = new Intl.NumberFormat('en-US', {
    style: 'percent',
  }).format(value / 100);

  if (options.addPrefix && value > 0) {
    return `+${result}`;
  }

  return result;
};
