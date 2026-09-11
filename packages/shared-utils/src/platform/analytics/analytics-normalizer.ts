export const normalizeData = (data: number[], min: number, max: number): number[] => {
  if (min === max) return data.map(() => 0.5);
  return data.map((v) => (v - min) / (max - min));
};

export const standardizeData = (data: number[]): number[] => {
  if (data.length === 0) return [];
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
  const std = Math.sqrt(variance);
  if (std === 0) return data.map(() => 0);
  return data.map((v) => (v - mean) / std);
};
