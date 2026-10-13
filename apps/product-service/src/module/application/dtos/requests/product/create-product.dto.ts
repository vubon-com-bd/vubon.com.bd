/**
 * Create Product Request DTO
 * @module product-service/application/dtos/requests/product
 *
 * Shape derives from CreateProductRequestSchema in shared-schemas/business/product.
 * Single source of truth — no duplicate Zod definitions.
 */
import type { CreateProductRequestSchemaType } from '@vubon/shared-schemas/business';

export type CreateProductRequestDTO = CreateProductRequestSchemaType;

// ─── Command-specific extras (not in schema) ─
export interface CreateProductCommandDTO extends CreateProductRequestDTO {
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
