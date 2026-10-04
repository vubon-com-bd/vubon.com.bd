/**
 * ClearCartRequestDTO
 * @module cart-service/application/dtos/requests/cart
 */
export interface ClearCartRequestDTO {
  readonly cartId: string;
  readonly clearedBy?: string;
}
