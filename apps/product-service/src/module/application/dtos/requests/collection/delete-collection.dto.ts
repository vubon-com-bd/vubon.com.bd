/**
 * Delete Collection Request DTO
 * @module product-service/application/dtos/requests/collection
 */
export interface DeleteCollectionRequestDTO {
  readonly collectionId: string;
  readonly reason?: string;
  readonly actorId?: string;
}
