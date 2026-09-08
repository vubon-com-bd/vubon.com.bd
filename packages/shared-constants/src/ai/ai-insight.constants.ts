import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { AI_ANALYTICS } from './ai-analytics.constants';
import { AI_FORECAST } from './ai-forecast.constants';

export const AI_INSIGHT = {
  TYPES: {
    ...COMMON_TYPES,
    TREND: 'trend',
    PATTERN: 'pattern',
    ANOMALY: 'anomaly',
    CORRELATION: 'correlation',
    SEASONALITY: 'seasonality',
    OPPORTUNITY: 'opportunity',
    RISK: 'risk',
    RECOMMENDATION: 'recommendation',
  },
  AI_ANALYTICS: { ...AI_ANALYTICS },
  AI_FORECAST: { ...AI_FORECAST },
  INSIGHT_PRIORITY: {
    CRITICAL: 1,
    HIGH: 2,
    MEDIUM: 3,
    LOW: 4,
  },
  INSIGHT_CONFIDENCE_THRESHOLD: 0.7,
  MAX_INSIGHTS_PER_ANALYSIS: 20,
  INSIGHT_RETENTION_DAYS: 90,
  AUTO_INSIGHT_GENERATION_INTERVAL_HOURS: 24,
} as const;
