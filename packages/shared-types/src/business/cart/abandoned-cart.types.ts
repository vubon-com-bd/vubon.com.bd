/**
 * Abandoned Cart Types
 * @module shared-types/business/cart
 *
 * Values আসে shared-constants/business/cart/abandoned-cart.constants থেকে।
 */

import type { ABANDONED_CART_STATUS } from '@vubon/shared-constants/business';
import type { CartId, UserId, Email, Money } from '../../common/primitives';

export type AbandonedCartStatusValue =
  (typeof ABANDONED_CART_STATUS)[keyof typeof ABANDONED_CART_STATUS];

export interface AbandonedCart {
  readonly id: string;
  readonly cartId: CartId;
  readonly userId?: UserId;
  readonly email?: Email;
  readonly status: AbandonedCartStatusValue;
  readonly itemCount: number;
  readonly cartValue: Money;
  readonly currency: string;
  readonly abandonedAt: string;
  readonly remindersSent: number;
  readonly lastReminderAt?: string;
  readonly recoveredAt?: string;
  readonly recoveredOrderId?: string;
  readonly recoveryDiscountPercent?: number;
}

export interface AbandonedCartReminder {
  readonly abandonedCartId: string;
  readonly channel: 'email' | 'sms' | 'push';
  readonly sentAt: string;
  readonly openedAt?: string;
  readonly clickedAt?: string;
  readonly convertedAt?: string;
}

export interface AbandonedCartRecovery {
  readonly abandonedCartId: string;
  readonly recoveredAt: string;
  readonly orderId: string;
  readonly recoveredValue: Money;
  readonly discountApplied?: Money;
}
