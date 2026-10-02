/**
 * AddItemRequestDTO
 * @module cart-service/application/dtos/requests/item
 */
export interface AddItemRequestDTO {
  readonly cartId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly vendorId?: string;
  readonly sku: string;
  readonly name: string;
  readonly imageUrl?: string;
  readonly unitPrice: number;
  readonly compareAtPrice?: number;
  readonly quantity: number;
  readonly currency: string;
  readonly attributes?: Readonly<Record<string, string>>;
}
