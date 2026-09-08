export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const formatPercentageChange = (oldValue: number, newValue: number): string => {
  const change = ((newValue - oldValue) / oldValue) * 100;
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};
