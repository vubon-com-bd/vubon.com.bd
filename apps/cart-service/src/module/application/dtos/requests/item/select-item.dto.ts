/**
 * SelectItemRequestDTO
 * @module cart-service/application/dtos/requests/item
 */
export interface SelectItemRequestDTO {
  readonly cartId: string;
  readonly itemId: string;
  readonly selected: boolean;
}
