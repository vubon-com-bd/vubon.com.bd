export interface ComparisonResult {
  change: number;
  percentChange: number;
  status: 'increase' | 'decrease' | 'no_change';
}

export const compareData = (current: number, previous: number): ComparisonResult => {
  if (previous === 0) return { change: current, percentChange: 0, status: 'no_change' };
  const change = current - previous;
  const percentChange = (change / previous) * 100;
  const status = change > 0 ? 'increase' : change < 0 ? 'decrease' : 'no_change';
  return { change, percentChange, status };
};
