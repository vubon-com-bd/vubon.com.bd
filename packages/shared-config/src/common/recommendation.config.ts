export const recommendationConfig = {
  maxRecommendations: 20,
  minRecommendations: 3,
  scoreThreshold: 0.3,
  cacheTtl: 12 * 60 * 60,
  strategies: ['collaborative_filtering', 'content_based', 'hybrid'],
  weights: {
    collaborative_filtering: 0.3,
    content_based: 0.25,
    popularity: 0.15,
    trending: 0.1,
    contextual: 0.1,
    sequential: 0.1,
  },
} as const;
