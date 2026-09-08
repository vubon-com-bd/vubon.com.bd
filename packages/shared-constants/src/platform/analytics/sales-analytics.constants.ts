import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { ORDER_STATUS } from '../../business/checkout/order-status.constants';
import { PAYMENT_STATUS } from '../../business/payment/payment-status.constants';

export const SALES_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
    COMPARISON: 'comparison',
    TREND: 'trend',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  METRICS: {
    TOTAL_SALES: 'total_sales',
    TOTAL_ORDERS: 'total_orders',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    GROSS_REVENUE: 'gross_revenue',
    NET_REVENUE: 'net_revenue',
    DISCOUNT_AMOUNT: 'discount_amount',
    TAX_AMOUNT: 'tax_amount',
    SHIPPING_AMOUNT: 'shipping_amount',
  },
  COMPARISON_PERIODS: {
    PREVIOUS_DAY: 'previous_day',
    PREVIOUS_WEEK: 'previous_week',
    PREVIOUS_MONTH: 'previous_month',
    PREVIOUS_YEAR: 'previous_year',
    SAME_PERIOD_LAST_YEAR: 'same_period_last_year',
  },
} as const;
