/**
 * UpdateQuantityRequestDTO
 * @module cart-service/application/dtos/requests/item
 */
export interface UpdateQuantityRequestDTO {
  readonly cartId: string;
  readonly itemId: string;
  readonly quantity: number;
  readonly reason?: string;
}
