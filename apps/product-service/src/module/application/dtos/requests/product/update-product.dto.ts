/**
 * Update Product Request DTO
 * @module product-service/application/dtos/requests/product
 */
import type { UpdateProductRequestSchemaType } from '@vubon/shared-schemas/business';

export type UpdateProductRequestDTO = UpdateProductRequestSchemaType;

export interface UpdateProductCommandDTO {
  readonly productId: string;
  readonly patch: UpdateProductRequestDTO;
  readonly actorId?: string;
}
