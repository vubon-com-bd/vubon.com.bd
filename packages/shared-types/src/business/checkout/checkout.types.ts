/**
 * Checkout Core Types
 * @module shared-types/business/checkout
 *
 * Checkout session — cart → order-এ যাওয়ার মাঝের state।
 */

import type { CartId, UserId, Money, Email, Phone } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { Address } from '../../common/geo';
import type { CartItem } from '../cart/cart-item.types';
import type { CartTotals } from '../cart/cart.types';
import type { CheckoutStatusValue } from './checkout-status.types';
import type { CheckoutStepValue, CheckoutStepState } from './checkout-step.types';

export type CheckoutTypeValue = 'guest' | 'registered' | 'express' | 'one_click' | 'subscription';

export interface Checkout extends BaseEntity<string> {
  readonly cartId: CartId;
  readonly userId?: UserId;
  readonly type: CheckoutTypeValue;
  readonly status: CheckoutStatusValue;
  readonly currentStep: CheckoutStepValue;
  readonly steps: readonly CheckoutStepState[];
  readonly email?: Email;
  readonly phone?: Phone;
  readonly shippingAddress?: Address;
  readonly billingAddress?: Address;
  readonly items: readonly CartItem[];
  readonly totals: CartTotals;
  readonly currency: string;
  readonly paymentMethod?: string;
  readonly paymentIntentId?: string;
  readonly shippingMethodId?: string;
  readonly notes?: string;
  readonly reservedUntil?: string;
  readonly expiresAt: string;
  readonly completedAt?: string;
}

export interface CheckoutPublic {
  readonly id: string;
  readonly status: CheckoutStatusValue;
  readonly currentStep: CheckoutStepValue;
  readonly steps: readonly CheckoutStepState[];
  readonly items: readonly CartItem[];
  readonly totals: CartTotals;
  readonly currency: string;
}

export interface CheckoutSummary {
  readonly id: string;
  readonly status: CheckoutStatusValue;
  readonly itemCount: number;
  readonly total: Money;
  readonly currency: string;
  readonly expiresAt: string;
}

export interface CheckoutCreateInput {
  readonly cartId: CartId;
  readonly userId?: UserId;
  readonly type: CheckoutTypeValue;
  readonly email: Email;
  readonly phone?: Phone;
}

export interface CheckoutShippingInput {
  readonly shippingAddress: Address;
  readonly billingAddress?: Address;
  readonly shippingMethodId?: string;
}

export interface CheckoutPaymentInput {
  readonly paymentMethod: string;
  readonly paymentGateway?: string;
  readonly returnUrl?: string;
}

export interface CheckoutCompleteInput {
  readonly checkoutId: string;
  readonly paymentIntentId: string;
  readonly idempotencyKey?: string;
}

export interface CheckoutCompleteResult {
  readonly success: boolean;
  readonly orderId?: string;
  readonly orderNumber?: string;
  readonly redirectUrl?: string;
  readonly error?: string;
}

export interface CheckoutValidationResult {
  readonly valid: boolean;
  readonly errors: readonly CheckoutValidationError[];
}

export interface CheckoutValidationError {
  readonly step: CheckoutStepValue;
  readonly field: string;
  readonly message: string;
  readonly code?: string;
}
