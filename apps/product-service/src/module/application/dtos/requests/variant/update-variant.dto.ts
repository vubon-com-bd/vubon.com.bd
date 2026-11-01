/**
 * Update Variant Request DTO
 * @module product-service/application/dtos/requests/variant
 */
import type { VariantTypeSchemaType } from '@vubon/shared-schemas/business';

export interface VariantOptionPatch {
  readonly name: string;
  readonly value: string;
}

export interface UpdateVariantRequestDTO {
  readonly variantId: string;
  readonly name?: string;
  readonly sku?: string;
  readonly barcode?: string;
  readonly type?: VariantTypeSchemaType;
  readonly options?: readonly VariantOptionPatch[];
  readonly price?: number;
  readonly compareAtPrice?: number;
  readonly cost?: number;
  readonly weight?: number;
  readonly imageUrl?: string;
  readonly isActive?: boolean;
  readonly actorId?: string;
}
