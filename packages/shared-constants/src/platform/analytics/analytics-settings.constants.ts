import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { ANALYTICS_TYPE } from './analytics-type.constants';

export const ANALYTICS_SETTINGS = {
  TYPES: {
    ...COMMON_TYPES,
    ...ANALYTICS_TYPE.TYPES,
    GENERAL: 'general',
    DATA: 'data',
    PRIVACY: 'privacy',
  },
  ANALYTICS_TYPE: { ...ANALYTICS_TYPE },
  SETTINGS_CATEGORIES: {
    DATA_COLLECTION: 'data_collection',
    DATA_STORAGE: 'data_storage',
    DATA_RETENTION: 'data_retention',
    PRIVACY: 'privacy',
    SECURITY: 'security',
    NOTIFICATIONS: 'notifications',
  },
  DATA_COLLECTION_OPTIONS: {
    FULL: 'full',
    AGGREGATED: 'aggregated',
    MINIMAL: 'minimal',
  },
  RETENTION_PERIODS: {
    DAYS_30: 30,
    DAYS_90: 90,
    DAYS_365: 365,
    DAYS_730: 730,
  },
  DEFAULT_SETTINGS: {
    DATA_COLLECTION: 'aggregated',
    DATA_RETENTION: 90,
    ENABLE_REAL_TIME: true,
    ENABLE_HISTORICAL: true,
    ENABLE_PREDICTIVE: false,
  },
} as const;
