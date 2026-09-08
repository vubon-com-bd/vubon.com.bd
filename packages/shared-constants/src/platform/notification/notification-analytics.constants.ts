import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { METRICS } from '../../common/types.constants';
import { NOTIFICATION_STATUS } from './notification-status.constants';
import { NOTIFICATION_TYPE } from './notification-type.constants';
import { NOTIFICATION_CHANNEL } from './notification-channel.constants';

export const NOTIFICATION_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    ...NOTIFICATION_TYPE.TYPES,
    DELIVERY: 'delivery',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
  },
  METRICS: {
    ...METRICS,
    TOTAL_SENT: 'total_sent',
    TOTAL_DELIVERED: 'total_delivered',
    DELIVERY_RATE: 'delivery_rate',
    OPEN_RATE: 'open_rate',
    CLICK_RATE: 'click_rate',
    CONVERSION_RATE: 'conversion_rate',
    BOUNCE_RATE: 'bounce_rate',
    UNSUBSCRIBE_RATE: 'unsubscribe_rate',
  },
  NOTIFICATION_STATUS: { ...NOTIFICATION_STATUS },
  NOTIFICATION_TYPE: { ...NOTIFICATION_TYPE },
  NOTIFICATION_CHANNEL: { ...NOTIFICATION_CHANNEL },
  ANALYTICS_GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  },
  RETENTION_DAYS: 90,
} as const;
