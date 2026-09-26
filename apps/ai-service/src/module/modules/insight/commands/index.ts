import { GenerateInsightHandler } from '../../../application/commands/insight/generate-insight.handler';
import { DetectAnomalyHandler } from '../../../application/commands/insight/detect-anomaly.handler';

export const InsightCommandHandlers = [
  GenerateInsightHandler,
  DetectAnomalyHandler,
];
