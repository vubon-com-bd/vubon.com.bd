export const optimizeSearchQuery = (query: string): string => {
  return query.trim().toLowerCase();
};

export const getSemanticSearchResults = <T>(
  query: string,
  embeddings: number[][],
  products: T[]
): T[] => {
  void query;
  void embeddings;
  return products;
};

export const getHybridSearchResults = <T>(
  keyword: string,
  vector: number[],
  products: T[]
): T[] => {
  void keyword;
  void vector;
  return products;
};
