/**
 * Delete Product Request DTO
 * @module product-service/application/dtos/requests/product
 */
export interface DeleteProductRequestDTO {
  readonly productId: string;
  readonly force?: boolean;
  readonly reason?: string;
  readonly actorId?: string;
}
