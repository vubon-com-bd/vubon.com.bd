/**
 * Checkout Step Value Types
 * @module shared-types/business/checkout
 *
 * Values আসে shared-constants/business/checkout/checkout-step.constants থেকে।
 */

import type { CHECKOUT_STEP, CHECKOUT_STEP_STATUS } from '@vubon/shared-constants/business';

export type CheckoutStepValue = (typeof CHECKOUT_STEP)[keyof typeof CHECKOUT_STEP];

export type CheckoutStepStatusValue =
  (typeof CHECKOUT_STEP_STATUS)[keyof typeof CHECKOUT_STEP_STATUS];

export interface CheckoutStepMetadata {
  readonly value: CheckoutStepValue;
  readonly label: string;
  readonly order: number;
  readonly isRequired: boolean;
}

export interface CheckoutStepState {
  readonly step: CheckoutStepValue;
  readonly status: CheckoutStepStatusValue;
  readonly completedAt?: string;
  readonly data?: Readonly<Record<string, unknown>>;
}
