export const AI_INSIGHT_TYPE = {
  TREND: 'trend',
  ANOMALY: 'anomaly',
  OPPORTUNITY: 'opportunity',
  RISK: 'risk',
  RECOMMENDATION: 'recommendation',
  PREDICTION: 'prediction',
  SUMMARY: 'summary',
  ALERT: 'alert',
  FORECAST: 'forecast',
  BENCHMARK: 'benchmark',
} as const;

export const AI_INSIGHT_PRIORITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  INFO: 'info',
} as const;

export const AI_INSIGHT_STATUS = {
  NEW: 'new',
  VIEWED: 'viewed',
  ACTIONED: 'actioned',
  DISMISSED: 'dismissed',
  ARCHIVED: 'archived',
  EXPIRED: 'expired',
} as const;

export const AI_INSIGHT = {
  TYPE: AI_INSIGHT_TYPE,
  PRIORITY: AI_INSIGHT_PRIORITY,
  STATUS: AI_INSIGHT_STATUS,
  MAX_INSIGHTS_PER_DAY: 1000,
  MIN_CONFIDENCE: 0.7,
  RETENTION_DAYS: 90,
  AUTO_EXPIRE_DAYS: 30,
  REFRESH_INTERVAL_HOURS: 6,
  NOTIFY_ON_CRITICAL: true,
  NOTIFY_ON_HIGH: true,
  GROUP_SIMILAR: true,
  MAX_TITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 2000,
} as const;

export type AiInsightType = typeof AI_INSIGHT;
