export interface ProductAnalyticsData {
  isActive: boolean;
  stock: number;
  sales?: number;
  rating?: number;
  views?: number;
}

export interface ProductAnalyticsResult<T> {
  totalProducts: number;
  activeProducts: number;
  outOfStock: number;
  bestSellers: T[];
  topRated: T[];
  mostViewed: T[];
}

export const calculateProductAnalytics = <T extends ProductAnalyticsData>(
  products: T[]
): ProductAnalyticsResult<T> => {
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive).length;
  const outOfStock = products.filter((p) => p.stock <= 0).length;
  const sortedBySales = [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0));
  const sortedByRating = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const sortedByViews = [...products].sort((a, b) => (b.views || 0) - (a.views || 0));
  return {
    totalProducts,
    activeProducts,
    outOfStock,
    bestSellers: sortedBySales.slice(0, 10),
    topRated: sortedByRating.slice(0, 10),
    mostViewed: sortedByViews.slice(0, 10),
  };
};
