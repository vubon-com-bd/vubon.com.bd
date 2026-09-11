export interface SEOScoreMetrics {
  title: number;
  description: number;
  keywords: number;
  readability: number;
  links: number;
  performance: number;
}

export interface SEOScoreData {
  scoreId: string;
  seoId: string;
  type: string;
  value: number;
  range: string;
  weight: string;
  isGood: boolean;
  isExcellent: boolean;
  isPoor: boolean;
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export const calculateSEOScore = (metrics: SEOScoreMetrics): SEOScoreData => {
  const weights: Record<keyof SEOScoreMetrics, number> = {
    title: 0.2,
    description: 0.15,
    keywords: 0.15,
    readability: 0.2,
    links: 0.15,
    performance: 0.15,
  };
  const value = Object.entries(metrics).reduce(
    (sum, [key, val]) => sum + val * weights[key as keyof SEOScoreMetrics],
    0
  );
  const range = value >= 90 ? 'excellent' : value >= 75 ? 'good' : value >= 60 ? 'average' : 'poor';
  return {
    scoreId: crypto.randomUUID(),
    seoId: '',
    type: 'overall',
    value,
    range,
    weight: 'technical',
    isGood: value >= 75,
    isExcellent: value >= 90,
    isPoor: value < 60,
    timestamp: new Date(),
    metadata: {},
  };
};
