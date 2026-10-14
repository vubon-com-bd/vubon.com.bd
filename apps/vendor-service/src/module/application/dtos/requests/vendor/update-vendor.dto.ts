/**
 * Update Vendor Request DTO
 * @module vendor-service/application/dtos/requests/vendor
 */
import type { UpdateVendorRequestSchemaType } from '@vubon/shared-schemas/business/vendor';

export type UpdateVendorRequestDTO = UpdateVendorRequestSchemaType;

export interface UpdateVendorCommandDTO {
  readonly vendorId: string;
  readonly patch: UpdateVendorRequestDTO;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
