/**
 * Update Price Request DTO
 * @module product-service/application/dtos/requests/pricing
 */
export interface UpdatePriceRequestDTO {
  readonly productId: string;
  readonly variantId?: string;
  readonly sellingPrice: number;
  readonly compareAtPrice?: number;
  readonly costPrice?: number;
  readonly reason?: string;
  readonly actorId?: string;
  readonly actorRole?: 'admin' | 'vendor' | 'staff';
  readonly bypassMinMargin?: boolean;
}
