/**
 * Checkout Types
 * @module shared-types/business/checkout
 *
 * Values come from shared-constants/business/checkout.
 */
import type {
  CHECKOUT_STATUS,
  CHECKOUT_STEP,
  CHECKOUT_TYPE,
} from '@vubon/shared-constants/business/checkout';
import type {
  CheckoutId,
  UserId,
  CartId,
  Money,
  Url,
} from '../../common/primitives/index.js';
import type { Address } from '../../common/geo/index.js';
import type { BaseEntity } from '../../common/base/index.js';

export type CheckoutStatusValue = (typeof CHECKOUT_STATUS)[keyof typeof CHECKOUT_STATUS];
export type CheckoutStepValue = (typeof CHECKOUT_STEP)[keyof typeof CHECKOUT_STEP];
export type CheckoutTypeValue = (typeof CHECKOUT_TYPE)[keyof typeof CHECKOUT_TYPE];

export interface Checkout extends BaseEntity<CheckoutId> {
  readonly customerId: UserId;
  readonly cartId?: CartId;
  readonly status: CheckoutStatusValue;
  readonly currentStep: CheckoutStepValue;
  readonly type: CheckoutTypeValue;

  readonly subtotal: Money;
  readonly discountAmount: Money;
  readonly taxAmount: Money;
  readonly shippingAmount: Money;
  readonly total: Money;
  readonly currency: string;

  readonly shippingAddress?: Address;
  readonly billingAddress?: Address;
  readonly shippingAddressId?: string;
  readonly billingAddressId?: string;
  readonly shippingMethodId?: string;
  readonly paymentMethod?: string;

  readonly orderId?: string;
  readonly expiresAt: string;
}

export interface CheckoutDTO {
  readonly id: CheckoutId;
  readonly customerId: UserId;
  readonly cartId?: CartId;
  readonly status: CheckoutStatusValue;
  readonly currentStep: CheckoutStepValue;
  readonly type: CheckoutTypeValue;
  readonly subtotal: Money;
  readonly discountAmount: Money;
  readonly taxAmount: Money;
  readonly shippingAmount: Money;
  readonly total: Money;
  readonly currency: string;
  readonly shippingAddress?: Address;
  readonly billingAddress?: Address;
  readonly shippingMethodId?: string;
  readonly paymentMethod?: string;
  readonly orderId?: string;
  readonly expiresAt: string;
  readonly isReadyToConfirm: boolean;
  readonly remainingSteps: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface StartCheckoutInput {
  readonly customerId: UserId;
  readonly cartId?: CartId;
  readonly type?: CheckoutTypeValue;
  readonly currency?: string;
}

export interface SelectAddressInput {
  readonly checkoutId: CheckoutId;
  readonly shippingAddress: Address;
  readonly billingAddress?: Address;
}

export interface SelectShippingInput {
  readonly checkoutId: CheckoutId;
  readonly shippingMethodId: string;
  readonly shippingCost: Money;
}

export interface SelectPaymentInput {
  readonly checkoutId: CheckoutId;
  readonly paymentMethod: string;
  readonly paymentGateway?: string;
}
