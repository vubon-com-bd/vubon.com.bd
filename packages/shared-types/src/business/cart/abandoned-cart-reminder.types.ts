/**
 * Abandoned Cart Reminder Value Types
 * @module shared-types/business/cart
 */
import type { ABANDONED_CART_REMINDER } from '@vubon/shared-constants/business/cart';

export type AbandonedCartReminderValue =
  (typeof ABANDONED_CART_REMINDER)[keyof typeof ABANDONED_CART_REMINDER];

export interface AbandonedCartReminderConfig {
  readonly type: AbandonedCartReminderValue;
  readonly delayHours: number;
  readonly enabled: boolean;
}
