export const calculateRanking = <T extends Record<string, unknown>>(
  items: T[],
  features: string[],
  weights: Record<string, number>
): (T & { score: number })[] => {
  return items
    .map((item) => {
      let score = 0;
      for (const feature of features) {
        const value = item[feature];
        score += (typeof value === 'number' ? value : 0) * (weights[feature] || 1);
      }
      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score);
};

export const getRankingFeatures = (type: string): string[] => {
  const features: Record<string, string[]> = {
    product: ['relevance', 'popularity', 'rating', 'recency', 'price'],
    content: ['relevance', 'freshness', 'popularity', 'engagement'],
  };
  return features[type] || features.product;
};

export const getRankingWeights = (type: string): Record<string, number> => {
  const weights: Record<string, Record<string, number>> = {
    product: {
      relevance: 0.3,
      popularity: 0.2,
      rating: 0.15,
      recency: 0.1,
      price: 0.1,
    },
    content: {
      relevance: 0.35,
      freshness: 0.25,
      popularity: 0.2,
      engagement: 0.2,
    },
  };
  return weights[type] || weights.product;
};
