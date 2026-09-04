/**
 * Refund Schema
 * রিফান্ড সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PAYMENT_STATUS } from '@vubon/shared-constants';

export const RefundSchema = BaseSchema.extend({
  paymentId: z.string().uuid(),
  amount: z.number().min(0, 'Refund amount must be greater than or equal to 0'),
  currency: z.string().default('BDT'),
  reason: z.string().min(1, 'Refund reason is required'),
  reasonBangla: z.string().optional(),
  status: z.enum([
    PAYMENT_STATUS.PENDING,
    PAYMENT_STATUS.PROCESSING,
    PAYMENT_STATUS.COMPLETED,
    PAYMENT_STATUS.FAILED,
    PAYMENT_STATUS.CANCELLED,
    PAYMENT_STATUS.REFUNDED,
    PAYMENT_STATUS.PARTIAL_REFUNDED,
  ] as [string, ...string[]]),
  gatewayRefundId: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
  approvedBy: z.string().uuid().optional(),
  processedBy: z.string().uuid().optional(),
  approvedAt: z.date().optional(),
  processedAt: z.date().optional(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),
});

export const RefundCreateSchema = RefundSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const RefundUpdateSchema = RefundCreateSchema.partial();

export type Refund = z.infer<typeof RefundSchema>;
export type RefundCreate = z.infer<typeof RefundCreateSchema>;
export type RefundUpdate = z.infer<typeof RefundUpdateSchema>;
