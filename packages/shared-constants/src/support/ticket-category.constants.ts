import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CATEGORY } from '../business/product/category.constants';

export const TICKET_CATEGORY = {
  TYPES: {
    ...COMMON_TYPES,
    ...CATEGORY.STATUS,
    ACCOUNT_ISSUES: 'account_issues',
    ORDER_ISSUES: 'order_issues',
    PAYMENT_ISSUES: 'payment_issues',
    DELIVERY_ISSUES: 'delivery_issues',
    PRODUCT_ISSUES: 'product_issues',
    VENDOR_ISSUES: 'vendor_issues',
    TECHNICAL_ISSUES: 'technical_issues',
    BILLING_ISSUES: 'billing_issues',
    RETURN_ISSUES: 'return_issues',
    REFUND_ISSUES: 'refund_issues',
    FEATURE_REQUEST: 'feature_request',
    COMPLAINT: 'complaint',
    FEEDBACK: 'feedback',
    GENERAL: 'general',
    OTHER: 'other',
  },
  PRODUCT_CATEGORIES: { ...CATEGORY },
  CATEGORY_AGENTS: {
    ACCOUNT_ISSUES: 'account_support',
    ORDER_ISSUES: 'order_support',
    PAYMENT_ISSUES: 'payment_support',
    DELIVERY_ISSUES: 'delivery_support',
    PRODUCT_ISSUES: 'product_support',
  },
} as const;
