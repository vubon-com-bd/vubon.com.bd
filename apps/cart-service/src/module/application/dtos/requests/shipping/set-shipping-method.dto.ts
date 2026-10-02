/**
 * SetShippingMethodRequestDTO
 * @module cart-service/application/dtos/requests/shipping
 */
export interface SetShippingMethodRequestDTO {
  readonly cartId: string;
  readonly method: string;
  readonly cost: number;
  readonly currency: string;
  readonly freeShippingThreshold?: number;
  readonly addressId?: string;
}
