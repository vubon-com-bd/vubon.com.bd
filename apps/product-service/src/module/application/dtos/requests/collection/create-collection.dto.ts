/**
 * CreateCollectionRequestDTO
 */
export interface CreateCollectionRequestDTO {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly type: string;
  readonly imageUrl?: string;
  readonly isFeatured?: boolean;
}
