/**
 * Set Default Variant Request DTO
 * @module product-service/application/dtos/requests/variant
 */
export interface SetDefaultVariantRequestDTO {
  readonly productId: string;
  readonly variantId: string;
  readonly actorId?: string;
}
