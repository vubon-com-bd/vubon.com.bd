/**
 * Vendor Status Schema
 * ভেন্ডর স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_STATUS } from '@vubon/shared-constants';

export const VendorStatusSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  status: z.enum(Object.values(VENDOR_STATUS) as [string, ...string[]]),
  note: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  previousStatus: z.enum(Object.values(VENDOR_STATUS) as [string, ...string[]]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const VendorStatusUpdateSchema = VendorStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type VendorStatus = z.infer<typeof VendorStatusSchema>;
export type VendorStatusUpdate = z.infer<typeof VendorStatusUpdateSchema>;
