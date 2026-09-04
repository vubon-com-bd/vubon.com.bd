/**
 * Refund Status Schema
 * রিফান্ড স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PAYMENT_STATUS } from '@vubon/shared-constants';

export const RefundStatusSchema = BaseSchema.extend({
  refundId: z.string().uuid(),
  status: z.enum([
    PAYMENT_STATUS.PENDING,
    PAYMENT_STATUS.PROCESSING,
    PAYMENT_STATUS.COMPLETED,
    PAYMENT_STATUS.FAILED,
    PAYMENT_STATUS.CANCELLED,
    PAYMENT_STATUS.REFUNDED,
    PAYMENT_STATUS.PARTIAL_REFUNDED,
  ] as [string, ...string[]]),
  note: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  previousStatus: z
    .enum([
      PAYMENT_STATUS.PENDING,
      PAYMENT_STATUS.PROCESSING,
      PAYMENT_STATUS.COMPLETED,
      PAYMENT_STATUS.FAILED,
      PAYMENT_STATUS.CANCELLED,
      PAYMENT_STATUS.REFUNDED,
      PAYMENT_STATUS.PARTIAL_REFUNDED,
    ] as [string, ...string[]])
    .optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const RefundStatusUpdateSchema = RefundStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type RefundStatus = z.infer<typeof RefundStatusSchema>;
export type RefundStatusUpdate = z.infer<typeof RefundStatusUpdateSchema>;
