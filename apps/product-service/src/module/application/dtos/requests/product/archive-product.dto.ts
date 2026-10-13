/**
 * Archive Product Request DTO
 * @module product-service/application/dtos/requests/product
 */
export interface ArchiveProductRequestDTO {
  readonly productId: string;
  readonly reason?: string;
  readonly actorId?: string;
}
