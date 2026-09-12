/**
 * Percentage Calculator.
 */
export const calculatePercentage = (part: number, whole: number): number => {
  if (whole === 0) return 0;
  return (part / whole) * 100;
};

export const calculatePercentageChange = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return newValue === 0 ? 0 : newValue > 0 ? Infinity : -Infinity;
  return ((newValue - oldValue) / oldValue) * 100;
};

export const applyPercentage = (value: number, percentage: number): number =>
  value * (1 + percentage / 100);
