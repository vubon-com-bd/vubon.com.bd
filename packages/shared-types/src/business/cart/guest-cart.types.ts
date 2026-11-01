/**
 * Guest Cart Value Types
 * @module shared-types/business/cart
 */
import type { GUEST_CART_STATUS } from '@vubon/shared-constants/business/cart';

export type GuestCartStatusValue = (typeof GUEST_CART_STATUS)[keyof typeof GUEST_CART_STATUS];

export interface GuestCart {
  readonly id: string;
  readonly token: string;
  readonly status: GuestCartStatusValue;
  readonly itemCount: number;
  readonly createdAt: string;
  readonly expiresAt: string;
}

export interface GuestCartMergeInput {
  readonly guestToken: string;
  readonly userId: string;
  readonly strategy?: string;
}
