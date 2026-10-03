/**
 * MoveToCartRequestDTO
 * @module cart-service/application/dtos/requests/saved
 */
export interface MoveToCartRequestDTO {
  readonly savedItemId: string;
  readonly cartId: string;
  readonly userId: string;
  readonly quantity?: number;
}
