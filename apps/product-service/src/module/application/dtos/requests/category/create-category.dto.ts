/**
 * Create Category Request DTO
 * @module product-service/application/dtos/requests/category
 */
export interface CreateCategoryRequestDTO {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly parentId?: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly sortOrder?: number;
  readonly isFeatured?: boolean;
  readonly actorId?: string;
  readonly idempotencyKey?: string;
}
