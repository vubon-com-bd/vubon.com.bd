export interface SatisfactionData {
  rating: string;
}

export const calculateSatisfactionScore = (satisfaction: SatisfactionData): number => {
  const scores: Record<string, number> = {
    very_satisfied: 5,
    satisfied: 4,
    neutral: 3,
    dissatisfied: 2,
    very_dissatisfied: 1,
  };
  return scores[satisfaction.rating] || 0;
};

export const calculateAverageSatisfaction = (satisfactions: SatisfactionData[]): number => {
  if (satisfactions.length === 0) return 0;
  const total = satisfactions.reduce((sum, s) => sum + calculateSatisfactionScore(s), 0);
  return total / satisfactions.length;
};

export const getSatisfactionLevel = (score: number): string => {
  if (score >= 4.5) return 'excellent';
  if (score >= 3.5) return 'good';
  if (score >= 2.5) return 'average';
  return 'poor';
};
