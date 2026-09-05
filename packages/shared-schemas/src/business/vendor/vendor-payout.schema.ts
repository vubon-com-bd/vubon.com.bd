/**
 * Vendor Payout Schema
 * ভেন্ডর পেআউট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PAYOUT_STATUS } from '@vubon/shared-constants';

export const VendorPayoutSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
  currency: z.string().default('BDT'),
  status: z.enum(Object.values(PAYOUT_STATUS) as [string, ...string[]]),
  methodId: z.string().uuid(),
  referenceId: z.string().optional(),
  transactionId: z.string().optional(),
  bankAccountId: z.string().uuid().optional(),
  mobileBankingId: z.string().uuid().optional(),
  description: z.string().optional(),
  descriptionBangla: z.string().optional(),
  requestedAt: z.date().default(() => new Date()),
  processedAt: z.date().optional(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  processedBy: z.string().uuid().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorPayoutCreateSchema = VendorPayoutSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorPayoutUpdateSchema = VendorPayoutCreateSchema.partial();

export type VendorPayout = z.infer<typeof VendorPayoutSchema>;
export type VendorPayoutCreate = z.infer<typeof VendorPayoutCreateSchema>;
export type VendorPayoutUpdate = z.infer<typeof VendorPayoutUpdateSchema>;
