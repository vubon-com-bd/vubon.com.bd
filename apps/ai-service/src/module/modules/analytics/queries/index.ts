import { GetModelPerformanceAnalyticsHandler } from '../../../application/queries/analytics/get-model-performance-analytics.handler';
import { GetAiUsageHandler } from '../../../application/queries/analytics/get-ai-usage.handler';

export const AnalyticsQueryHandlers = [
  GetModelPerformanceAnalyticsHandler,
  GetAiUsageHandler,
];
