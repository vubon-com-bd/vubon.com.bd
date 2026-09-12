import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const NOTIFICATION_CATEGORY = {
  TYPES: {
    ...COMMON_TYPES,
    SYSTEM: 'system',
    USER: 'user',
    ORDER: 'order',
    PAYMENT: 'payment',
    CART: 'cart',
    MARKETING: 'marketing',
    VENDOR: 'vendor',
    SUPPORT: 'support',
    SECURITY: 'security',
    SOCIAL: 'social',
    PROMOTIONAL: 'promotional',
    TRANSACTIONAL: 'transactional',
  },
} as const;
