import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { METRICS } from '../../common/types.constants';
import { ORDER_STATUS } from '../checkout/order-status.constants';
import { PAYMENT_STATUS } from '../payment/payment-status.constants';

export const DEAL_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    PERFORMANCE: 'performance',
    CONVERSION: 'conversion',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    CUSTOMER: 'customer',
  },
  METRICS: {
    ...METRICS,
    IMPRESSIONS: 'impressions',
    CLICKS: 'clicks',
    CTR: 'ctr',
    CONVERSION_RATE: 'conversion_rate',
    AOV: 'aov',
    REVENUE_PER_USER: 'revenue_per_user',
    PROFIT_MARGIN: 'profit_margin',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  ANALYTICS_GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  },
  BENCHMARK_PERIOD_DAYS: 30,
} as const;
