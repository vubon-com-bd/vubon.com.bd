/**
 * UpdateVariantRequestDTO
 */
export interface UpdateVariantRequestDTO {
  readonly variantId: string;
  readonly name?: string;
  readonly price?: number;
  readonly compareAtPrice?: number;
  readonly cost?: number;
  readonly weight?: number;
  readonly imageUrl?: string;
  readonly updatedBy: string;
}
