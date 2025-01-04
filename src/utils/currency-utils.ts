export const formatCurrency = (amount: number, currency: string = 'INR', locale: string = 'en-US'): string => {
  if (typeof amount !== 'number') {
    throw new Error('Amount must be a number');
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};
