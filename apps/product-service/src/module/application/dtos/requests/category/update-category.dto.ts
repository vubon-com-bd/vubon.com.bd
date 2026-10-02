/**
 * UpdateCategoryRequestDTO
 */
export interface UpdateCategoryRequestDTO {
  readonly categoryId: string;
  readonly name?: string;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly sortOrder?: number;
  readonly isFeatured?: boolean;
}
