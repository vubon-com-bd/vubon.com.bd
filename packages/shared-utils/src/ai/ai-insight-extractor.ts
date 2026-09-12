export interface AIInsightData {
  insightId: string;
  aiId: string;
  type: string;
  title: string;
  description: string;
  priority: string;
  confidence: number;
  analytics: unknown[];
  forecasts: unknown[];
  recommendations: string[];
  isActive: boolean;
  isActioned: boolean;
  metadata: Record<string, unknown>;
}

export const extractInsights = (data: unknown): AIInsightData[] => {
  void data;
  return [];
};

export const getInsightPriority = (priority: string): number => {
  const priorities: Record<string, number> = {
    critical: 1,
    high: 2,
    medium: 3,
    low: 4,
  };
  return priorities[priority] || 3;
};

export const rankInsights = <T extends { priority: string }>(insights: T[]): T[] => {
  return insights
    .map((i) => ({ ...i, priority: String(getInsightPriority(i.priority)) }))
    .sort((a, b) => Number(a.priority) - Number(b.priority));
};
