export const AI_ANALYTICS_METRIC = {
  PREDICTION_ACCURACY: 'prediction_accuracy',
  PRECISION: 'precision',
  RECALL: 'recall',
  F1_SCORE: 'f1_score',
  AUC_ROC: 'auc_roc',
  LATENCY_MS: 'latency_ms',
  THROUGHPUT: 'throughput',
  COST_PER_REQUEST: 'cost_per_request',
  TOKEN_USAGE: 'token_usage',
  ERROR_RATE: 'error_rate',
  USER_SATISFACTION: 'user_satisfaction',
  CONVERSION_LIFT: 'conversion_lift',
  ENGAGEMENT_LIFT: 'engagement_lift',
} as const;

export const AI_ANALYTICS_PERIOD = {
  TODAY: 'today',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_90_DAYS: 'last_90_days',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_YEAR: 'this_year',
  CUSTOM: 'custom',
} as const;

export const AI_ANALYTICS = {
  METRIC: AI_ANALYTICS_METRIC,
  PERIOD: AI_ANALYTICS_PERIOD,
  RETENTION_DAYS: 365,
  REFRESH_INTERVAL_SECONDS: 300,
  TRACK_LATENCY: true,
  TRACK_COST: true,
  TRACK_ACCURACY: true,
  TRACK_TOKEN_USAGE: true,
  ANONYMIZE_DATA: true,
  MAX_DATE_RANGE_DAYS: 365,
} as const;

export type AiAnalyticsType = typeof AI_ANALYTICS;
