import { z } from 'zod';
import { VENDOR_TIER } from '@vubon/shared-constants/src/business/vendor/vendor-tier.constants';

const vendorTierKeys = Object.keys(VENDOR_TIER) as [string, ...string[]];

export const VendorTierSchema = z.object({
  type: z.enum(vendorTierKeys),
  category: z.literal('vendor_tier'),
  commissionRate: z.number().min(0).max(100),
  maxProducts: z.number().int().min(0),
  maxTeamMembers: z.number().int().min(0),
  prioritySupport: z.boolean().default(false),
  apiAccess: z.boolean().default(false),
  customBranding: z.boolean().default(false),
});

export const VendorTierEnumSchema = z.enum(vendorTierKeys);
