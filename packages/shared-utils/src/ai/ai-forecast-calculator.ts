export interface ForecastPoint {
  value: number;
  confidence: number;
}

export const calculateForecast = (data: number[], horizon: number): ForecastPoint[] => {
  const window = Math.min(data.length, 7);
  const forecasts: ForecastPoint[] = [];
  const workingData = [...data];
  for (let i = 0; i < horizon; i++) {
    const recent = workingData.slice(-window);
    const avg = recent.reduce((sum, v) => sum + v, 0) / recent.length;
    forecasts.push({
      value: avg,
      confidence: 0.8,
    });
    workingData.push(avg);
  }
  return forecasts;
};

export const calculateTrend = (data: number[]): 'increasing' | 'decreasing' | 'stable' => {
  if (data.length < 2) return 'stable';
  const first = data.slice(0, Math.floor(data.length / 2));
  const second = data.slice(Math.floor(data.length / 2));
  const firstAvg = first.reduce((sum, v) => sum + v, 0) / first.length;
  const secondAvg = second.reduce((sum, v) => sum + v, 0) / second.length;
  if (secondAvg > firstAvg * 1.05) return 'increasing';
  if (secondAvg < firstAvg * 0.95) return 'decreasing';
  return 'stable';
};
