import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const CHECKOUT_STEP = {
  ...COMMON_TYPES,
  CART_REVIEW: 'cart_review',
  SHIPPING_ADDRESS: 'shipping_address',
  BILLING_ADDRESS: 'billing_address',
  DELIVERY_METHOD: 'delivery_method',
  PAYMENT: 'payment',
  CONFIRMATION: 'confirmation',
  COMPLETE: 'complete',
} as const;
