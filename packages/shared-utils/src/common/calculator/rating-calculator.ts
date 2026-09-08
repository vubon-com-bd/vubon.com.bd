export const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((a, b) => a + b, 0);
  return sum / ratings.length;
};

export const calculateRatingDistribution = (ratings: number[]): Record<number, number> => {
  const distribution: Record<number, number> = {};
  for (let i = 1; i <= 5; i++) {
    distribution[i] = ratings.filter((r) => Math.round(r) === i).length;
  }
  return distribution;
};
