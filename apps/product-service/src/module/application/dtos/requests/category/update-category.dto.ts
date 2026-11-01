/**
 * Update Category Request DTO
 * @module product-service/application/dtos/requests/category
 */
import type { CategoryStatusSchemaType } from '@vubon/shared-schemas/business';

export interface UpdateCategoryRequestDTO {
  readonly categoryId: string;
  readonly name?: string;
  readonly description?: string;
  readonly parentId?: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly status?: CategoryStatusSchemaType;
  readonly sortOrder?: number;
  readonly isFeatured?: boolean;
  readonly actorId?: string;
}
