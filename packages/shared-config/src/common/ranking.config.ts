export const rankingConfig = {
  algorithm: 'lambda_mart' as const,
  features: ['relevance', 'popularity', 'rating', 'recency', 'personalization', 'context'],
  weights: {
    relevance: 0.3,
    popularity: 0.2,
    rating: 0.15,
    recency: 0.1,
    personalization: 0.15,
    context: 0.1,
  },
  maxResults: 100,
  updateInterval: 6 * 60 * 60,
} as const;
