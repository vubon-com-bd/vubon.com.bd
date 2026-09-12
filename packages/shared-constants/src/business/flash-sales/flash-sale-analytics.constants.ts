import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { METRICS } from '../../common/types.constants';
import { ORDER_STATUS } from '../checkout/order-status.constants';
import { PAYMENT_STATUS } from '../payment/payment-status.constants';

export const FLASH_SALE_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    SALES: 'sales',
    REVENUE: 'revenue',
    CONVERSION: 'conversion',
    TRAFFIC: 'traffic',
    ENGAGEMENT: 'engagement',
    RETENTION: 'retention',
  },
  METRICS: {
    ...METRICS,
    VIEWS: 'views',
    CLICKS: 'clicks',
    ADD_TO_CART: 'add_to_cart',
    CHECKOUTS: 'checkouts',
    PURCHASES: 'purchases',
    REVENUE: 'revenue',
    REFUNDS: 'refunds',
    RATE: 'rate',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  ANALYTICS_TIME_FRAMES: {
    REAL_TIME: 'real_time',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  },
  KPI_WEIGHTS: {
    SALES: 0.4,
    REVENUE: 0.3,
    CONVERSION: 0.2,
    ENGAGEMENT: 0.1,
  },
} as const;
