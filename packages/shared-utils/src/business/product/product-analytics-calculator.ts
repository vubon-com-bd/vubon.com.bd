export interface ProductPerformance {
  productId: string;
  views: number;
  uniqueViews: number;
  addToCart: number;
  purchases: number;
  revenue: number;
  conversionRate: number;
  averageRating: number;
  reviewCount: number;
  wishlistCount: number;
  shareCount: number;
}

export const calculateProductConversionRate = (views: number, purchases: number): number => {
  if (views === 0) return 0;
  return (purchases / views) * 100;
};

export const calculateProductRevenue = (
  products: { price: number; quantity: number }[]
): number => {
  return products.reduce((sum, p) => sum + p.price * p.quantity, 0);
};

export const calculateProductAverageOrderValue = (revenue: number, orders: number): number => {
  if (orders === 0) return 0;
  return revenue / orders;
};

export const calculateProductPerformance = (metrics: {
  views: number;
  purchases: number;
  revenue: number;
  orders: number;
}): ProductPerformance => {
  return {
    productId: '',
    views: metrics.views,
    uniqueViews: metrics.views,
    addToCart: 0,
    purchases: metrics.purchases,
    revenue: metrics.revenue,
    conversionRate: calculateProductConversionRate(metrics.views, metrics.purchases),
    averageRating: 0,
    reviewCount: 0,
    wishlistCount: 0,
    shareCount: 0,
  };
};
