/**
 * InitiateCheckoutRequestDTO
 * @module cart-service/application/dtos/requests/checkout
 */
import type { Address } from '@vubon/shared-types/common';

export interface InitiateCheckoutRequestDTO {
  readonly cartId: string;
  readonly shippingAddress: Address;
  readonly billingAddress?: Address;
  readonly paymentMethod?: string;
  readonly shippingMethod?: string;
  readonly customerNotes?: string;
  readonly notes?: string;
  readonly idempotencyKey?: string;
}
