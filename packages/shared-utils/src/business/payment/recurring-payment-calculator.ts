export const calculateRecurringAmount = (amount: number, interval: number): number => {
  return amount * interval;
};

export const calculateTotalRecurring = (amount: number, intervals: number): number => {
  return amount * intervals;
};

export const calculateNextBillingDate = (
  startDate: Date,
  interval: number,
  unit: 'day' | 'week' | 'month'
): Date => {
  const next = new Date(startDate);
  if (unit === 'day') next.setDate(next.getDate() + interval);
  if (unit === 'week') next.setDate(next.getDate() + interval * 7);
  if (unit === 'month') next.setMonth(next.getMonth() + interval);
  return next;
};
