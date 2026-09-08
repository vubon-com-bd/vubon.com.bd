import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { USER_STATUS } from '../../user/user-status.constants';

export const CUSTOMER_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    SEGMENTATION: 'segmentation',
    LIFETIME_VALUE: 'lifetime_value',
    PURCHASE_BEHAVIOR: 'purchase_behavior',
  },
  USER_STATUS: { ...USER_STATUS },
  METRICS: {
    TOTAL_CUSTOMERS: 'total_customers',
    NEW_CUSTOMERS: 'new_customers',
    REPEAT_CUSTOMERS: 'repeat_customers',
    AVERAGE_LIFETIME_VALUE: 'average_lifetime_value',
    AVERAGE_ORDER_FREQUENCY: 'average_order_frequency',
    AVERAGE_ORDER_VALUE: 'average_order_value',
  },
  CUSTOMER_SEGMENTS: {
    VIP: 'vip',
    PREMIUM: 'premium',
    REGULAR: 'regular',
    NEW: 'new',
    AT_RISK: 'at_risk',
    CHURNED: 'churned',
  },
  RFM_ANALYSIS: {
    RECENCY: 'recency',
    FREQUENCY: 'frequency',
    MONETARY: 'monetary',
  },
} as const;
