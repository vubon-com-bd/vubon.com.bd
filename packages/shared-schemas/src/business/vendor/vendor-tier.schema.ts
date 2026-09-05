/**
 * Vendor Tier Schema
 * ভেন্ডর টায়ার সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_TIERS } from '@vubon/shared-constants';

export const VendorTierSchema = BaseSchema.extend({
  tier: z.enum(Object.values(VENDOR_TIERS) as [string, ...string[]]),
  name: z.string().min(1, 'Tier name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  commissionRate: z.number().min(0).max(100),
  maxProducts: z.number().int().min(0),
  maxOrders: z.number().int().min(0),
  features: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const VendorTierCreateSchema = VendorTierSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorTierUpdateSchema = VendorTierCreateSchema.partial();

export type VendorTier = z.infer<typeof VendorTierSchema>;
export type VendorTierCreate = z.infer<typeof VendorTierCreateSchema>;
export type VendorTierUpdate = z.infer<typeof VendorTierUpdateSchema>;
