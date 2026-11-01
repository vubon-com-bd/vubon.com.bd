/**
 * Vendor Tier Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-tier.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_TIER } from '@vubon/shared-constants/business';

export const VendorTierSchema = z.enum(Object.values(VENDOR_TIER) as [string, ...string[]]);

export const VendorTierHistorySchema = z.object({
  vendorId: z.string().min(1),
  previousTier: VendorTierSchema,
  newTier: VendorTierSchema,
  reason: z.string().min(1).max(500),
  changedAt: z.string().datetime(),
});

export type VendorTierSchemaType = z.infer<typeof VendorTierSchema>;
export type VendorTierHistorySchemaType = z.infer<typeof VendorTierHistorySchema>;
