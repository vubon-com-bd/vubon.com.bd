/**
 * Remove Variant Request DTO
 * @module product-service/application/dtos/requests/variant
 */
export interface RemoveVariantRequestDTO {
  readonly variantId: string;
  readonly productId: string;
  readonly reason?: string;
  readonly actorId?: string;
}
