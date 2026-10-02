/**
 * CartItemResponseDTO (standalone)
 * @module cart-service/application/dtos/responses
 */
export interface CartItemStandaloneResponseDTO {
  readonly id: string;
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
  readonly lineSubtotal: number;
  readonly discountAmount: number;
  readonly lineTotal: number;
  readonly status: string;
  readonly isAvailable: boolean;
  readonly isSelected: boolean;
  readonly attributes?: Readonly<Record<string, string>>;
  readonly currency: string;
  readonly addedAt: string;
  readonly updatedAt: string;
}
