export interface VendorPerformanceMetrics {
  fulfillmentRate?: number;
  onTimeDelivery?: number;
  customerSatisfaction?: number;
  averageRating?: number;
}

export const calculatePerformanceScore = (metrics: VendorPerformanceMetrics): number => {
  const weights = {
    fulfillmentRate: 0.3,
    onTimeDelivery: 0.25,
    customerSatisfaction: 0.25,
    averageRating: 0.2,
  };
  let score = 0;
  for (const [key, value] of Object.entries(metrics)) {
    const weight = weights[key as keyof typeof weights];
    if (weight && value !== undefined) {
      score += (value / 100) * weight;
    }
  }
  return score * 100;
};

export const calculateVendorRating = (reviews: { rating: number }[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
};
