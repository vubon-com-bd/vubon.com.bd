import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { VENDOR_STATUS } from '../../business/vendor/vendor-status.constants';
import { VENDOR_TIER } from '../../business/vendor/vendor-tier.constants';

export const VENDOR_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    PERFORMANCE: 'performance',
    SALES: 'sales',
    COMMISSION: 'commission',
    RATING: 'rating',
  },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  VENDOR_TIER: { ...VENDOR_TIER },
  METRICS: {
    TOTAL_VENDORS: 'total_vendors',
    ACTIVE_VENDORS: 'active_vendors',
    TOTAL_SALES: 'total_sales',
    TOTAL_COMMISSION: 'total_commission',
    AVERAGE_RATING: 'average_rating',
    TOP_VENDORS: 'top_vendors',
    VENDOR_RETENTION: 'vendor_retention',
  },
  PERFORMANCE_INDICATORS: {
    ORDER_FULFILLMENT_RATE: 'order_fulfillment_rate',
    ON_TIME_DELIVERY: 'on_time_delivery',
    CUSTOMER_SATISFACTION: 'customer_satisfaction',
  },
} as const;
