/**
 * Payment Status Schema
 * পেমেন্ট স্ট্যাটাস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PAYMENT_STATUS } from '@vubon/shared-constants';

export const PaymentStatusSchema = BaseSchema.extend({
  paymentId: z.string().uuid(),
  status: z.enum(Object.values(PAYMENT_STATUS) as [string, ...string[]]),
  note: z.string().optional(),
  changedBy: z.string().uuid().optional(),
  previousStatus: z.enum(Object.values(PAYMENT_STATUS) as [string, ...string[]]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const PaymentStatusUpdateSchema = PaymentStatusSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;
export type PaymentStatusUpdate = z.infer<typeof PaymentStatusUpdateSchema>;
