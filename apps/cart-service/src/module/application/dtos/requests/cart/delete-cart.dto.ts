/**
 * DeleteCartRequestDTO
 * @module cart-service/application/dtos/requests/cart
 */
export interface DeleteCartRequestDTO {
  readonly cartId: string;
  readonly deletedBy?: string;
  readonly reason?: string;
}
