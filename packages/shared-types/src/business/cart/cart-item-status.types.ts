/**
 * Cart Item Status Value Types
 * @module shared-types/business/cart
 */
import type { CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

export type CartItemStatusValue = (typeof CART_ITEM_STATUS)[keyof typeof CART_ITEM_STATUS];

export interface CartItemStatusMetadata {
  readonly value: CartItemStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
