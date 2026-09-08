import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const FAQ_CATEGORY = {
  TYPES: {
    ...COMMON_TYPES,
    GENERAL: 'general',
    ACCOUNT: 'account',
    ORDER: 'order',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    RETURN: 'return',
    PRODUCT: 'product',
    VENDOR: 'vendor',
    TECHNICAL: 'technical',
    BILLING: 'billing',
  },
} as const;
