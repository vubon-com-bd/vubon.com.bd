/**
 * Checkout Response DTOs
 * @module order-service/application/dtos/responses
 */

export interface CheckoutResponseDTO {
  readonly id: string;
  readonly customerId: string;
  readonly status: string;
  readonly currentStep: string;
  readonly expiresAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CheckoutPublicResponseDTO {
  readonly id: string;
  readonly status: string;
  readonly currentStep: string;
  readonly expiresAt: string;
}

export interface CheckoutSessionResponseDTO {
  readonly id: string;
  readonly checkoutId: string;
  readonly status: string;
  readonly currentStep: string;
  readonly shippingAddressId?: string;
  readonly deliveryMethodId?: string;
  readonly paymentMethod?: string;
  readonly startedAt: string;
  readonly lastActivityAt: string;
}

export interface CheckoutConfirmResponseDTO {
  readonly success: true;
  readonly checkoutId: string;
  readonly orderId: string;
  readonly orderNumber: string;
}
