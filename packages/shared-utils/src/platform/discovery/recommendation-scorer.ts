export interface RecommendationScoreData {
  score: number;
  rank: number;
  type: string;
}

export const scoreRecommendation = (recommendation: RecommendationScoreData): number => {
  let score = 0;
  score += recommendation.score * 10;
  score += (1 - recommendation.rank / 10) * 5;
  if (recommendation.type === 'personalized') score += 10;
  if (recommendation.type === 'trending') score += 5;
  if (recommendation.type === 'popular') score += 3;
  return Math.min(score, 100);
};

export const rankRecommendations = <T extends RecommendationScoreData>(
  recommendations: T[]
): T[] => {
  return recommendations
    .map((r) => ({ ...r, score: scoreRecommendation(r) }))
    .sort((a, b) => b.score - a.score)
    .map((r, index) => ({ ...r, rank: index + 1 }));
};
