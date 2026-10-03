/**
 * CreateCategoryRequestDTO
 */
export interface CreateCategoryRequestDTO {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly parentId?: string;
  readonly imageUrl?: string;
  readonly sortOrder?: number;
}
