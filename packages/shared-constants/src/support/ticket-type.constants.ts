import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const TICKET_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    GENERAL: 'general',
    TECHNICAL: 'technical',
    BILLING: 'billing',
    ORDER: 'order',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    RETURN: 'return',
    REFUND: 'refund',
    PRODUCT: 'product',
    VENDOR: 'vendor',
    ACCOUNT: 'account',
    SECURITY: 'security',
    FEATURE: 'feature',
    COMPLAINT: 'complaint',
    FEEDBACK: 'feedback',
  },
} as const;
