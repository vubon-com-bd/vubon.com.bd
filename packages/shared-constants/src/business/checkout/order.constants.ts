/**
 * Order Constants (EXTENDS common/status + common/types)
 * @module shared-constants/business/checkout/order.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { TAX } from '../../common/tax.constants';
import { DISCOUNT } from '../../common/discount.constants';
import { PAYMENT_METHODS } from '../../common/payment-methods.constants';
import { SHIPPING_METHODS } from '../../common/shipping-methods.constants';

export const ORDER = {
  // Base status from common
  STATUS: STATUS,

  // Types from common
  TYPES: TYPES,

  // Currency from common
  CURRENCY: CURRENCY,

  // Tax from common
  TAX: TAX,

  // Discount from common
  DISCOUNT: DISCOUNT,

  // Payment methods from common
  PAYMENT_METHODS: PAYMENT_METHODS,

  // Shipping methods from common
  SHIPPING_METHODS: SHIPPING_METHODS,

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

  // Order validation
  ORDER_VALIDATION: {
    REQUIRES_ITEMS: true,
    REQUIRES_ADDRESS: true,
    REQUIRES_PAYMENT: true,
    REQUIRES_SHIPPING: true,
    MIN_AMOUNT: 0,
    MAX_AMOUNT: 99999999.99,
  } as const,
} as const;

export type OrderType = (typeof ORDER.ORDER_TYPE)[keyof typeof ORDER.ORDER_TYPE];
export type OrderSource = (typeof ORDER.ORDER_SOURCE)[keyof typeof ORDER.ORDER_SOURCE];
export type OrderPriority = (typeof ORDER.ORDER_PRIORITY)[keyof typeof ORDER.ORDER_PRIORITY];
