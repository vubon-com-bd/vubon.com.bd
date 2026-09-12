export interface PopularProduct {
  viewCount: number;
  rating: number;
  reviewCount: number;
  purchaseCount?: number;
  shareCount?: number;
  bookmarkCount?: number;
}

export const calculatePopularityScore = (product: PopularProduct): number => {
  const viewWeight = 0.2;
  const purchaseWeight = 0.4;
  const ratingWeight = 0.15;
  const reviewWeight = 0.1;
  const shareWeight = 0.1;
  const bookmarkWeight = 0.05;

  return (
    product.viewCount * viewWeight +
    (product.purchaseCount || 0) * purchaseWeight +
    product.rating * ratingWeight +
    product.reviewCount * reviewWeight +
    (product.shareCount || 0) * shareWeight +
    (product.bookmarkCount || 0) * bookmarkWeight
  );
};

export const getPopularProducts = <T extends PopularProduct>(products: T[]): T[] => {
  return products
    .map((p) => ({ product: p, score: calculatePopularityScore(p) }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
};
