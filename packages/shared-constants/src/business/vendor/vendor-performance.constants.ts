import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { METRICS } from '../../common/types.constants';
import { ORDER_STATUS } from '../checkout/order-status.constants';
import { PAYMENT_STATUS } from '../payment/payment-status.constants';

export const VENDOR_PERFORMANCE = {
  TYPES: {
    ...COMMON_TYPES,
    SALES: 'sales',
    REVENUE: 'revenue',
    CUSTOMER: 'customer',
    QUALITY: 'quality',
    EFFICIENCY: 'efficiency',
  },
  METRICS: {
    ...METRICS,
    TOTAL_SALES: 'total_sales',
    TOTAL_REVENUE: 'total_revenue',
    ORDERS_FULFILLED: 'orders_fulfilled',
    AVERAGE_RATING: 'average_rating',
    CUSTOMER_SATISFACTION: 'customer_satisfaction',
    RETURN_RATE: 'return_rate',
    RESPONSE_TIME: 'response_time',
    CONVERSION_RATE: 'conversion_rate',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  PERFORMANCE_WEIGHTS: {
    SALES: 0.3,
    REVENUE: 0.25,
    CUSTOMER: 0.25,
    QUALITY: 0.2,
  },
  MIN_ORDERS_FOR_RATING: 10,
  PERFORMANCE_THRESHOLDS: {
    EXCELLENT: 90,
    GOOD: 75,
    AVERAGE: 60,
    POOR: 40,
  },
  REVIEW_PERIOD_DAYS: 30,
} as const;
