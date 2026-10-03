import type { CheckoutStatusValue, CheckoutStepValue } from '@vubon/shared-types/business/checkout';

export interface CheckoutAddressResponseDTO {
  readonly fullName: string;
  readonly phone: string;
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state?: string;
  readonly postalCode?: string;
  readonly country: string;
}

export interface CheckoutResponseDTO {
  readonly id: string;
  readonly customerId: string;
  readonly cartId?: string;
  readonly status: CheckoutStatusValue;
  readonly currentStep: CheckoutStepValue;
  readonly type: string;
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly shippingAddress?: CheckoutAddressResponseDTO;
  readonly billingAddress?: CheckoutAddressResponseDTO;
  readonly shippingMethodId?: string;
  readonly paymentMethod?: string;
  readonly orderId?: string;
  readonly expiresAt: string;
  readonly isReadyToConfirm: boolean;
  readonly remainingSteps: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CheckoutSessionResponseDTO {
  readonly id: string;
  readonly checkoutId: string;
  readonly customerId: string;
  readonly token: string;
  readonly expiresAt: string;
  readonly isExpired: boolean;
  readonly remainingMs: number;
}
