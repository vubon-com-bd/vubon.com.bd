/**
 * UpdateItemRequestDTO
 * @module cart-service/application/dtos/requests/item
 */
export interface UpdateItemRequestDTO {
  readonly cartId: string;
  readonly itemId: string;
  readonly quantity?: number;
  readonly unitPrice?: number;
  readonly discountAmount?: number;
  readonly attributes?: Readonly<Record<string, string>>;
}
