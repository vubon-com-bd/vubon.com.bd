/**
 * Duplicate Product Request DTO
 * @module product-service/application/dtos/requests/product
 */
export interface DuplicateProductRequestDTO {
  readonly productId: string;
  readonly newName?: string;
  readonly newSlug?: string;
  readonly copyVariants?: boolean;
  readonly copyImages?: boolean;
  readonly actorId?: string;
}
