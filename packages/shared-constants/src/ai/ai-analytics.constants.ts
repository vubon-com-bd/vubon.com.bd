import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { METRICS } from '../common/types.constants';
import { SEARCH_ANALYTICS } from '../platform/search/search-analytics.constants';
import { MARKETING_ANALYTICS } from '../marketing/marketing-analytics.constants';

export const AI_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    ...SEARCH_ANALYTICS.TYPES,
    ...MARKETING_ANALYTICS.TYPES,
    PREDICTIVE: 'predictive',
    PRESCRIPTIVE: 'prescriptive',
    DIAGNOSTIC: 'diagnostic',
    DESCRIPTIVE: 'descriptive',
    COGNITIVE: 'cognitive',
  },
  METRICS: {
    ...METRICS,
    ...SEARCH_ANALYTICS.METRICS,
    ...MARKETING_ANALYTICS.METRICS,
    PREDICTION_ACCURACY: 'prediction_accuracy',
    MODEL_CONFIDENCE: 'model_confidence',
    ANOMALY_SCORE: 'anomaly_score',
    TREND_STRENGTH: 'trend_strength',
    SEASONALITY: 'seasonality',
  },
  SEARCH_ANALYTICS: { ...SEARCH_ANALYTICS },
  MARKETING_ANALYTICS: { ...MARKETING_ANALYTICS },
  ANALYTICS_ALGORITHMS: {
    REGRESSION: 'regression',
    CLASSIFICATION: 'classification',
    CLUSTERING: 'clustering',
    ANOMALY_DETECTION: 'anomaly_detection',
    FORECASTING: 'forecasting',
  },
  PREDICTION_THRESHOLD: 0.8,
  ANOMALY_THRESHOLD: 2.5,
  MIN_DATA_POINTS_FOR_ANALYSIS: 100,
} as const;
