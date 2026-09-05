/**
 * Vendor Activity Schema
 * ভেন্ডর অ্যাক্টিভিটি সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_ACTIVITY } from '@vubon/shared-constants';

export const VendorActivitySchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  type: z.enum(Object.values(VENDOR_ACTIVITY.TYPES) as [string, ...string[]]),
  description: z.string().min(1, 'Description is required'),
  descriptionBangla: z.string().optional(),
  status: z.enum(Object.values(VENDOR_ACTIVITY.STATUS) as [string, ...string[]]),
  priority: z.enum(Object.values(VENDOR_ACTIVITY.PRIORITY) as [string, ...string[]]),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  location: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorActivityCreateSchema = VendorActivitySchema.omit({
  id: true,
  createdAt: true,
});

export type VendorActivity = z.infer<typeof VendorActivitySchema>;
export type VendorActivityCreate = z.infer<typeof VendorActivityCreateSchema>;
