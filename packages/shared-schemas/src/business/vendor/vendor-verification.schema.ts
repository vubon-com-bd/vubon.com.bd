/**
 * Vendor Verification Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-verification.constants থেকে।
 */

import { z } from 'zod';
import {
  VENDOR_VERIFICATION_STATUS,
  VENDOR_VERIFICATION_TYPE,
} from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const VendorVerificationStatusSchema = z.enum(
  Object.values(VENDOR_VERIFICATION_STATUS) as [string, ...string[]]
);

export const VendorVerificationTypeSchema = z.enum(
  Object.values(VENDOR_VERIFICATION_TYPE) as [string, ...string[]]
);

export const VendorVerificationCheckSchema = z.object({
  type: VendorVerificationTypeSchema,
  status: VendorVerificationStatusSchema,
  verifiedAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
});

export const VendorVerificationSchema = z.object({
  vendorId: UuidSchema,
  status: VendorVerificationStatusSchema,
  checks: z.array(VendorVerificationCheckSchema).max(20),
  submittedAt: z.string().datetime().optional(),
  reviewedAt: z.string().datetime().optional(),
  reviewedBy: z.string().optional(),
  rejectionReason: z.string().max(500).optional(),
  expiresAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime(),
});

export type VendorVerificationStatusSchemaType = z.infer<typeof VendorVerificationStatusSchema>;
export type VendorVerificationTypeSchemaType = z.infer<typeof VendorVerificationTypeSchema>;
export type VendorVerificationSchemaType = z.infer<typeof VendorVerificationSchema>;
