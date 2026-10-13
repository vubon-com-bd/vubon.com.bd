/**
 * Publish Product Request DTO
 * @module product-service/application/dtos/requests/product
 */
export interface PublishProductRequestDTO {
  readonly productId: string;
  readonly requireImages?: boolean;
  readonly requireStock?: boolean;
  readonly minStockThreshold?: number;
  readonly actorId?: string;
}
