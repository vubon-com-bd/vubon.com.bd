export interface RatingData {
  score: number;
}

export interface RatingCriteria {
  productQuality?: number;
  shippingSpeed?: number;
  customerService?: number;
  valueForMoney?: number;
  packaging?: number;
  accuracy?: number;
}

export const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r, 0);
  return sum / ratings.length;
};

export const calculateVendorRatingScore = (ratings: RatingData[]): number => {
  const scores = ratings.map((r) => r.score);
  return calculateAverageRating(scores);
};

export const calculateCriteriaRating = (criteria: RatingCriteria): number => {
  const values = Object.values(criteria).filter((v): v is number => v !== undefined);
  return calculateAverageRating(values);
};
