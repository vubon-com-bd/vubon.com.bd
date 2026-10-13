/**
 * Delete Category Request DTO
 * @module product-service/application/dtos/requests/category
 */
export interface DeleteCategoryRequestDTO {
  readonly categoryId: string;
  readonly reason?: string;
  readonly actorId?: string;
}
