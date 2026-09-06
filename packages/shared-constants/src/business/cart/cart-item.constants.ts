/**
 * Cart Item Constants (EXTENDS common/status + common/types)
 * @module shared-constants/business/cart/cart-item.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { TAX } from '../../common/tax.constants';
import { DISCOUNT } from '../../common/discount.constants';

export const CART_ITEM = {
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

  // Cart item specific
  MAX_QUANTITY: 999,
  MIN_QUANTITY: 1,
  DEFAULT_QUANTITY: 1,
  MAX_ITEMS_PER_CART: 50,
  ITEM_CACHE_TTL: 3600,

  // Cart item status
  CART_ITEM_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    REMOVED: 'removed',
    MOVED_TO_SAVED: 'moved_to_saved',
    CONVERTED: 'converted',
    OUT_OF_STOCK: 'out_of_stock',
    DISCONTINUED: 'discontinued',
  } as const,

  // Cart item type
  CART_ITEM_TYPE: {
    PRODUCT: 'product',
    VARIANT: 'variant',
    SERVICE: 'service',
    SUBSCRIPTION: 'subscription',
    BUNDLE: 'bundle',
    KIT: 'kit',
    DIGITAL: 'digital',
    CUSTOM: 'custom',
  } as const,

  // Cart item discount type
  CART_ITEM_DISCOUNT: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    BUNDLE: 'bundle',
    BOGO: 'bogo',
  } as const,

  // Cart item validation
  CART_ITEM_VALIDATION: {
    REQUIRED: 'required',
    OPTIONAL: 'optional',
    MIN_QUANTITY: 'min_quantity',
    MAX_QUANTITY: 'max_quantity',
    STOCK_AVAILABLE: 'stock_available',
    PRICE_VALID: 'price_valid',
    CUSTOM: 'custom',
  } as const,

  // Cart item tax
  CART_ITEM_TAX: {
    APPLICABLE: true,
    INCLUDED: false,
    CALCULATION: 'percentage',
  } as const,
} as const;

export type CartItemStatus =
  (typeof CART_ITEM.CART_ITEM_STATUS)[keyof typeof CART_ITEM.CART_ITEM_STATUS];
export type CartItemType = (typeof CART_ITEM.CART_ITEM_TYPE)[keyof typeof CART_ITEM.CART_ITEM_TYPE];
export type CartItemDiscount =
  (typeof CART_ITEM.CART_ITEM_DISCOUNT)[keyof typeof CART_ITEM.CART_ITEM_DISCOUNT];
export type CartItemValidation =
  (typeof CART_ITEM.CART_ITEM_VALIDATION)[keyof typeof CART_ITEM.CART_ITEM_VALIDATION];
