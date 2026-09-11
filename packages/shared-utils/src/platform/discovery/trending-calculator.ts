export interface TrendingProduct {
  id: string;
  createdAt?: Date;
}

export const calculateTrendingScore = (
  product: TrendingProduct,
  views: number,
  purchases: number
): number => {
  const viewWeight = 0.3;
  const purchaseWeight = 0.5;
  const recencyWeight = 0.2;
  const recency = product.createdAt
    ? (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    : 0;
  const recencyScore = Math.max(0, 1 - recency / 30);
  return views * viewWeight + purchases * purchaseWeight + recencyScore * recencyWeight;
};

export const getTrendingProducts = <T extends TrendingProduct>(
  products: T[],
  metrics: Record<string, { views: number; purchases: number }>
): T[] => {
  return products
    .map((p) => ({
      product: p,
      score: calculateTrendingScore(p, metrics[p.id]?.views || 0, metrics[p.id]?.purchases || 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
};
