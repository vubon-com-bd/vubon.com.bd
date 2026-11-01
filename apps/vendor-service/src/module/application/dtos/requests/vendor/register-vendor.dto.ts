/**
 * Register Vendor Request DTO
 * @module vendor-service/application/dtos/requests/vendor
 *
 * Shape derives from RegisterVendorRequestSchema in shared-schemas/business/vendor.
 * Single source of truth — no duplicate Zod definitions.
 */
import type { RegisterVendorRequestSchemaType } from '@vubon/shared-schemas/business/vendor';

export type RegisterVendorRequestDTO = RegisterVendorRequestSchemaType;

// ─── Command-specific extras (not in schema) ─
export interface RegisterVendorCommandDTO extends RegisterVendorRequestDTO {
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
