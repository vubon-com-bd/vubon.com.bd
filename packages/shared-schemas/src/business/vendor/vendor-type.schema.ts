/**
 * Vendor Type Schema
 * ভেন্ডর টাইপ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_TYPES } from '@vubon/shared-constants';

export const VendorTypeSchema = BaseSchema.extend({
  type: z.enum(Object.values(VENDOR_TYPES) as [string, ...string[]]),
  name: z.string().min(1, 'Type name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const VendorTypeCreateSchema = VendorTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorTypeUpdateSchema = VendorTypeCreateSchema.partial();

export type VendorType = z.infer<typeof VendorTypeSchema>;
export type VendorTypeCreate = z.infer<typeof VendorTypeCreateSchema>;
export type VendorTypeUpdate = z.infer<typeof VendorTypeUpdateSchema>;
