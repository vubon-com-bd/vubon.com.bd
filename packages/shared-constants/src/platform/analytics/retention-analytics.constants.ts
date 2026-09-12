import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const RETENTION_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    COHORT: 'cohort',
    CHURN: 'churn',
    LIFETIME: 'lifetime',
  },
  METRICS: {
    RETENTION_RATE: 'retention_rate',
    CHURN_RATE: 'churn_rate',
    LIFETIME_VALUE: 'lifetime_value',
    REPEAT_PURCHASE_RATE: 'repeat_purchase_rate',
    TIME_TO_CHURN: 'time_to_churn',
  },
  RETENTION_PERIODS: {
    DAY_1: 'day_1',
    DAY_7: 'day_7',
    DAY_30: 'day_30',
    DAY_90: 'day_90',
    DAY_365: 'day_365',
  },
  CHURN_REASONS: {
    PRICE: 'price',
    COMPETITION: 'competition',
    SERVICE: 'service',
    PRODUCT: 'product',
    OTHER: 'other',
  },
} as const;
