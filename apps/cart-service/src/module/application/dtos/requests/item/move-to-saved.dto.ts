/**
 * MoveToSavedRequestDTO
 * @module cart-service/application/dtos/requests/item
 */
export interface MoveToSavedRequestDTO {
  readonly cartId: string;
  readonly itemId: string;
  readonly userId: string;
}
