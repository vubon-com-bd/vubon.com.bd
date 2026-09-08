export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
};

export const calculateWeightedAverage = (values: number[], weights: number[]): number => {
  if (values.length !== weights.length || values.length === 0) return 0;
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const weightedSum = values.reduce((sum, value, i) => sum + value * weights[i], 0);
  return weightedSum / totalWeight;
};
