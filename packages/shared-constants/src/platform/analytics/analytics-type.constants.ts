import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const ANALYTICS_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    USER: 'user',
    PRODUCT: 'product',
    SALES: 'sales',
    ORDER: 'order',
    VENDOR: 'vendor',
    MARKETING: 'marketing',
    TRAFFIC: 'traffic',
    PERFORMANCE: 'performance',
    FINANCIAL: 'financial',
    INVENTORY: 'inventory',
    CUSTOMER: 'customer',
    SUPPORT: 'support',
    CHANNEL: 'channel',
    ACQUISITION: 'acquisition',
    ENGAGEMENT: 'engagement',
    RETENTION: 'retention',
  },
} as const;
