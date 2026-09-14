/**
 * Vendor Return Policy Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-return-policy.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_RETURN_TYPE } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema } from '../../common/primitives/money.schema';

export const VendorReturnTypeSchema = z.enum(
  Object.values(VENDOR_RETURN_TYPE) as [string, ...string[]]
);

export const VendorReturnPolicySchema = z.object({
  vendorId: UuidSchema,
  type: VendorReturnTypeSchema,
  windowDays: z.number().int().min(0).max(30),
  freeReturn: z.boolean(),
  restockFeePercent: z.number().min(0).max(100),
  maxRestockFee: MoneySchema.optional(),
  requireReason: z.boolean(),
  requireImages: z.boolean(),
  maxImages: z.number().int().min(0).max(10),
  autoApprove: z.boolean(),
  approvalSlaHours: z.number().int().positive(),
  exclusions: z.array(z.string()).max(50).optional(),
  notes: z.string().max(1000).optional(),
  updatedAt: z.string().datetime(),
});

export type VendorReturnTypeSchemaType = z.infer<typeof VendorReturnTypeSchema>;
export type VendorReturnPolicySchemaType = z.infer<typeof VendorReturnPolicySchema>;
