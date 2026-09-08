import { calculateAverage } from '../common/calculator';

export const calculateAdminAnalytics = (metrics: number[]): { average: number; trend: number } => {
  const average = calculateAverage(metrics);
  const trend =
    metrics.length > 1 ? ((metrics[metrics.length - 1] - metrics[0]) / metrics[0]) * 100 : 0;
  return { average, trend };
};

export const calculatePerformanceScore = (metrics: Record<string, number>): number => {
  const weights = {
    ticketsResolved: 0.3,
    responseTime: 0.25,
    satisfactionScore: 0.25,
    escalationRate: 0.2,
  };
  let score = 0;
  for (const [key, value] of Object.entries(metrics)) {
    if (weights[key as keyof typeof weights]) {
      score += value * weights[key as keyof typeof weights];
    }
  }
  return score;
};
