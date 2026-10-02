/**
 * CalculateShippingRequestDTO
 * @module cart-service/application/dtos/requests/shipping
 */
export interface CalculateShippingRequestDTO {
  readonly cartId: string;
  readonly method?: string;
  readonly addressId?: string;
  readonly subtotal?: number;
}
