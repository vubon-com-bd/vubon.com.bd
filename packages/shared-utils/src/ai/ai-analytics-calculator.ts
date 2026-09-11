export interface AIAnalyticsData {
  metric: string;
  value: number;
}

export interface AIMetrics {
  totalPredictions: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  latency: number;
  uptime: number;
}

const calculateAvg = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
};

export const calculateAIMetrics = (analytics: AIAnalyticsData[]): AIMetrics => {
  const predictions = analytics.filter((a) => a.metric === 'totalPredictions');
  const accuracies = analytics.filter((a) => a.metric === 'accuracy');
  const precisions = analytics.filter((a) => a.metric === 'precision');
  const recalls = analytics.filter((a) => a.metric === 'recall');
  const f1s = analytics.filter((a) => a.metric === 'f1Score');
  const latencies = analytics.filter((a) => a.metric === 'latency');
  const uptimes = analytics.filter((a) => a.metric === 'uptime');

  return {
    totalPredictions: predictions.reduce((sum, a) => sum + a.value, 0),
    accuracy: calculateAvg(accuracies.map((a) => a.value)),
    precision: calculateAvg(precisions.map((a) => a.value)),
    recall: calculateAvg(recalls.map((a) => a.value)),
    f1Score: calculateAvg(f1s.map((a) => a.value)),
    latency: calculateAvg(latencies.map((a) => a.value)),
    uptime: calculateAvg(uptimes.map((a) => a.value)),
  };
};
