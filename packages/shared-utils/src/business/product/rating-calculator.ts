export const calculateProductAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r, 0);
  return sum / ratings.length;
};

export const calculateProductRatingDistribution = (ratings: number[]): Record<number, number> => {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const rating of ratings) {
    distribution[rating] = (distribution[rating] || 0) + 1;
  }
  return distribution;
};

export const calculateProductRating = (ratings: number[]): number => {
  return calculateProductAverageRating(ratings);
};

export const calculateProductRatingPercentage = (ratings: number[], rating: number): number => {
  const total = ratings.length;
  if (total === 0) return 0;
  const count = ratings.filter((r) => r === rating).length;
  return (count / total) * 100;
};
