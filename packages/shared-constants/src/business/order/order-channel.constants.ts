/**
 * Order Channel Constants
 * @module shared-constants/business/order
 *
 * কোন channel থেকে order এসেছে।
 */
export const ORDER_CHANNEL = {
  WEB: 'web',
  MOBILE_APP: 'mobile_app',
  POS: 'pos',
  API: 'api',
  PHONE: 'phone',
  MARKETPLACE: 'marketplace',
  SOCIAL: 'social',
  ADMIN: 'admin',
} as const;

export type OrderChannelType = (typeof ORDER_CHANNEL)[keyof typeof ORDER_CHANNEL];
