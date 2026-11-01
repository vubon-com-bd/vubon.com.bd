/**
 * Add Variant Request DTO
 * @module product-service/application/dtos/requests/variant
 */
import type { AddVariantRequestSchemaType } from '@vubon/shared-schemas/business';

export type AddVariantRequestDTO = AddVariantRequestSchemaType;

export interface AddVariantCommandDTO extends AddVariantRequestDTO {
  readonly actorId?: string;
  readonly idempotencyKey?: string;
}
