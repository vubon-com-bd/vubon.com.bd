/**
 * Delete Brand Request DTO
 * @module product-service/application/dtos/requests/brand
 */
export interface DeleteBrandRequestDTO {
  readonly brandId: string;
  readonly reason?: string;
  readonly actorId?: string;
}
