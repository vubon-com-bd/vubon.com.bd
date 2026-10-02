/**
 * UpdateCollectionRequestDTO
 */
export interface UpdateCollectionRequestDTO {
  readonly collectionId: string;
  readonly name?: string;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly isFeatured?: boolean;
  readonly sortOrder?: number;
}
