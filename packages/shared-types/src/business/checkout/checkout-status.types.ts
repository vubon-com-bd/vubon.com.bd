/**
 * Checkout Status Value Types
 * @module shared-types/business/checkout
 *
 * Values আসে shared-constants/business/checkout/checkout-status.constants থেকে।
 */

import type { CHECKOUT_STATUS } from '@vubon/shared-constants/business';

export type CheckoutStatusValue = (typeof CHECKOUT_STATUS)[keyof typeof CHECKOUT_STATUS];

export interface CheckoutStatusMetadata {
  readonly value: CheckoutStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
