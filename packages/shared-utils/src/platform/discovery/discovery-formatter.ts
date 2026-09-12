export interface DiscoveryFormatData {
  recommendations: unknown[];
  type: string;
}

export interface RecommendationFormatData {
  product: { name: string };
  score: number;
  rank: number;
}

export const formatDiscoverySummary = (discovery: DiscoveryFormatData): string => {
  return `Recommendations: ${discovery.recommendations.length} | Type: ${discovery.type}`;
};

export const formatRecommendation = (recommendation: RecommendationFormatData): string => {
  return `Product: ${recommendation.product.name} | Score: ${recommendation.score.toFixed(2)} | Rank: #${recommendation.rank}`;
};

export const formatRecommendationList = (recommendations: RecommendationFormatData[]): string[] => {
  return recommendations.map(formatRecommendation);
};
