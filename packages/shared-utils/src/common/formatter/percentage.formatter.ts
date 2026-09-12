/**
 * Percentage Formatter.
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
  if (!Number.isFinite(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
};

export const formatPercentageChange = (
  oldValue: number,
  newValue: number,
  decimals: number = 2
): string => {
  if (!Number.isFinite(oldValue) || !Number.isFinite(newValue)) return '0%';
  if (oldValue === 0) {
    return newValue === 0 ? '0%' : newValue > 0 ? '+∞%' : '-∞%';
  }
  const change = ((newValue - oldValue) / oldValue) * 100;
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(decimals)}%`;
};
