/**
 * Cart Status Value Types
 * @module shared-types/business/cart
 *
 * Values আসে shared-constants/business/cart/cart-status.constants থেকে।
 */

import type { CART_STATUS } from '@vubon/shared-constants/business';

export type CartStatusValue = (typeof CART_STATUS)[keyof typeof CART_STATUS];

export interface CartStatusMetadata {
  readonly value: CartStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
