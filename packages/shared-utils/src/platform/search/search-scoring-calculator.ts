export interface SearchScoringProduct {
  name: string;
  description: string;
  rating: number;
  viewCount: number;
  tags?: { name: string }[];
  category?: { name: string };
  brand?: { name: string };
}

export const calculateSearchScore = (product: SearchScoringProduct, query: string): number => {
  let score = 0;
  const queryWords = query.toLowerCase().split(' ');
  const title = product.name.toLowerCase();
  const description = product.description.toLowerCase();

  for (const word of queryWords) {
    if (title.includes(word)) score += 5;
    if (description.includes(word)) score += 2;
    if (product.tags?.some((t) => t.name.toLowerCase().includes(word))) score += 3;
    if (product.category?.name.toLowerCase().includes(word)) score += 4;
    if (product.brand?.name.toLowerCase().includes(word)) score += 3;
  }

  score += product.rating * 2;
  score += product.viewCount * 0.01;
  return Math.min(score, 100);
};
