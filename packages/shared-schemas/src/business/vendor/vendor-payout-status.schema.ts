/**
 * Vendor Payout Status Schema
 * ভেন্ডর পেআউট স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PAYOUT_STATUS } from '@vubon/shared-constants';

export const VendorPayoutStatusSchema = BaseSchema.extend({
  payoutId: z.string().uuid(),
  status: z.enum(Object.values(PAYOUT_STATUS) as [string, ...string[]]),
  note: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  previousStatus: z.enum(Object.values(PAYOUT_STATUS) as [string, ...string[]]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const VendorPayoutStatusUpdateSchema = VendorPayoutStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type VendorPayoutStatus = z.infer<typeof VendorPayoutStatusSchema>;
export type VendorPayoutStatusUpdate = z.infer<typeof VendorPayoutStatusUpdateSchema>;
