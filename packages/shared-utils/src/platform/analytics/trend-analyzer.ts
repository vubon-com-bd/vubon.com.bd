export interface TrendResult {
  direction: 'up' | 'down' | 'stable';
  change: number;
  volatility: number;
}

export const analyzeTrend = (data: number[]): TrendResult => {
  if (data.length < 2) return { direction: 'stable', change: 0, volatility: 0 };
  const firstHalf = data.slice(0, Math.floor(data.length / 2));
  const secondHalf = data.slice(Math.floor(data.length / 2));
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const change = firstAvg === 0 ? 0 : ((secondAvg - firstAvg) / firstAvg) * 100;
  const direction = change > 5 ? 'up' : change < -5 ? 'down' : 'stable';
  const volatility = Math.sqrt(
    data.reduce((a, b) => a + Math.pow(b - firstAvg, 2), 0) / data.length
  );
  return { direction, change, volatility };
};
