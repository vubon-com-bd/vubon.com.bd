/**
 * Vendor Warranty Schema
 * ভেন্ডর ওয়ারেন্টি সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_WARRANTY } from '@vubon/shared-constants';

export const VendorWarrantySchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  type: z.enum(Object.values(VENDOR_WARRANTY.TYPES) as [string, ...string[]]),
  name: z.string().min(1, 'Warranty name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  descriptionBangla: z.string().optional(),
  coverage: z.enum(Object.values(VENDOR_WARRANTY.COVERAGE) as [string, ...string[]]),
  durationDays: z.number().int().min(0).default(365),
  isActive: z.boolean().default(true),
  terms: z.string().optional(),
  termsBangla: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorWarrantyCreateSchema = VendorWarrantySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorWarrantyUpdateSchema = VendorWarrantyCreateSchema.partial();

export type VendorWarranty = z.infer<typeof VendorWarrantySchema>;
export type VendorWarrantyCreate = z.infer<typeof VendorWarrantyCreateSchema>;
export type VendorWarrantyUpdate = z.infer<typeof VendorWarrantyUpdateSchema>;
