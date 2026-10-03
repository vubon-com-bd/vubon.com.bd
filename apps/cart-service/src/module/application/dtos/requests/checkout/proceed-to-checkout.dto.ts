/**
 * ProceedToCheckoutRequestDTO
 * @module cart-service/application/dtos/requests/checkout
 */
export interface ProceedToCheckoutRequestDTO {
  readonly cartId: string;
  readonly userId?: string;
  readonly shippingAddressId?: string;
  readonly billingAddressId?: string;
  readonly notes?: string;
}
