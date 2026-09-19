/**
 * Vendor Warranty Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-warranty.constants থেকে।
 *
 * ⚠️ Note: VENDOR_WARRANTY_PERIOD numeric enum, তাই Zod enum-এ ব্যবহার করা যায় না।
 * periodDays numeric validation করা হয়েছে।
 */

import { z } from 'zod';
import { VENDOR_WARRANTY_TYPE } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const VendorWarrantyTypeSchema = z.enum(
  Object.values(VENDOR_WARRANTY_TYPE) as [string, ...string[]]
);

export const VendorWarrantySchema = z.object({
  id: UuidSchema,
  vendorId: UuidSchema,
  productId: UuidSchema.optional(),
  categoryId: UuidSchema.optional(),
  type: VendorWarrantyTypeSchema,
  periodDays: z.number().int().positive().max(3650),
  coversShipping: z.boolean(),
  requireProof: z.boolean(),
  autoRegister: z.boolean(),
  terms: z.string().max(5000).optional(),
  exclusions: z.array(z.string()).max(50).optional(),
  isActive: z.boolean(),
  updatedAt: z.string().datetime(),
});

export const WarrantyClaimSchema = z.object({
  id: UuidSchema,
  warrantyId: UuidSchema,
  orderId: UuidSchema,
  userId: UuidSchema,
  productId: UuidSchema,
  reason: z.string().min(1).max(500),
  description: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'resolved']),
  claimedAt: z.string().datetime(),
  resolvedAt: z.string().datetime().optional(),
});

export type VendorWarrantyTypeSchemaType = z.infer<typeof VendorWarrantyTypeSchema>;
export type VendorWarrantySchemaType = z.infer<typeof VendorWarrantySchema>;
export type WarrantyClaimSchemaType = z.infer<typeof WarrantyClaimSchema>;
