/**
 * RemoveItemRequestDTO
 * @module cart-service/application/dtos/requests/item
 */
export interface RemoveItemRequestDTO {
  readonly cartId: string;
  readonly itemId: string;
  readonly removedBy?: string;
}
