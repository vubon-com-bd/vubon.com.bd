/**
 * Checkout Status Types
 * @module shared-types/business/checkout
 *
 * Canonical CheckoutStatusValue lives in checkout.types.ts.
 */
import type { CheckoutStatusValue } from './checkout.types.js';

export interface CheckoutStatusMetadata {
  readonly value: CheckoutStatusValue;
  readonly label: string;
  readonly isFinal: boolean;
  readonly isActive: boolean;
}
