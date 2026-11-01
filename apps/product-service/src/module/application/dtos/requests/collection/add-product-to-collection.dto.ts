/**
 * Add Product to Collection Request DTO
 * @module product-service/application/dtos/requests/collection
 */
export interface AddProductToCollectionRequestDTO {
  readonly collectionId: string;
  readonly productId: string;
  readonly actorId?: string;
}
