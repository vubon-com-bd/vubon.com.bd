/**
 * Order Constants (EXTENDS common/status)
 * @module shared-constants/business/checkout/order.constants
 */

import { STATUS } from '../../common/status.constants';

export const ORDER = {
  // Base status from common
  STATUS: STATUS,

  // Order specific
  MAX_ORDER_ITEMS: 100,
  MIN_ORDER_AMOUNT: 0,
  MAX_ORDER_AMOUNT: 99999999.99,
  ORDER_CACHE_TTL: 3600,
  ORDER_NUMBER_PREFIX: 'ORD',
  ORDER_NUMBER_LENGTH: 10,

  // Order type
  ORDER_TYPE: {
    REGULAR: 'regular',
    BULK: 'bulk',
    WHOLESALE: 'wholesale',
    SUBSCRIPTION: 'subscription',
    PRE_ORDER: 'pre_order',
    BACK_ORDER: 'back_order',
    GIFT: 'gift',
    CORPORATE: 'corporate',
  } as const,

  // Order source
  ORDER_SOURCE: {
    WEBSITE: 'website',
    MOBILE: 'mobile',
    ADMIN: 'admin',
    API: 'api',
    POS: 'pos',
    MARKETPLACE: 'marketplace',
    SOCIAL: 'social',
    REFERRAL: 'referral',
  } as const,

  // Order priority
  ORDER_PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
  } as const,
} as const;

export type OrderType = (typeof ORDER.ORDER_TYPE)[keyof typeof ORDER.ORDER_TYPE];
export type OrderSource = (typeof ORDER.ORDER_SOURCE)[keyof typeof ORDER.ORDER_SOURCE];
export type OrderPriority = (typeof ORDER.ORDER_PRIORITY)[keyof typeof ORDER.ORDER_PRIORITY];
