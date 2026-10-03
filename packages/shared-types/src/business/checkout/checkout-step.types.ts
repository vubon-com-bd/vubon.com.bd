/**
 * Checkout Step Types
 * @module shared-types/business/checkout
 *
 * Canonical CheckoutStepValue lives in checkout.types.ts.
 */
import type {
  CHECKOUT_STEP_ORDER,
  CHECKOUT_STEP_STATUS,
} from '@vubon/shared-constants/business/checkout';
import type { CheckoutStepValue } from './checkout.types.js';

export type CheckoutStepStatusValue =
  (typeof CHECKOUT_STEP_STATUS)[keyof typeof CHECKOUT_STEP_STATUS];

export type CheckoutStepOrderMap = typeof CHECKOUT_STEP_ORDER;

export interface CheckoutStepMetadata {
  readonly value: CheckoutStepValue;
  readonly label: string;
  readonly order: number;
  readonly isRequired: boolean;
}
