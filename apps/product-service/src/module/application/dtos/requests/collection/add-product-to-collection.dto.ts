/**
 * AddProductToCollectionRequestDTO
 */
export interface AddProductToCollectionRequestDTO {
  readonly collectionId: string;
  readonly productId: string;
  readonly addedBy: string;
}
