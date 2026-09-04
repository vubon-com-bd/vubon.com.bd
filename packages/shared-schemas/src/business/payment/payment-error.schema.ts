/**
 * Payment Error Schema
 * পেমেন্ট এরর সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';

export const PaymentErrorSchema = BaseSchema.extend({
  paymentId: z.string().uuid(),
  code: z.string().min(1, 'Error code is required'),
  message: z.string().min(1, 'Error message is required'),
  messageBangla: z.string().optional(),
  type: z.enum(['validation', 'authorization', 'gateway', 'network', 'system', 'timeout']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  stack: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
  resolvedAt: z.date().optional(),
  resolvedBy: z.string().uuid().optional(),
});

export const PaymentErrorCreateSchema = PaymentErrorSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const PaymentErrorUpdateSchema = PaymentErrorCreateSchema.partial();

export type PaymentError = z.infer<typeof PaymentErrorSchema>;
export type PaymentErrorCreate = z.infer<typeof PaymentErrorCreateSchema>;
export type PaymentErrorUpdate = z.infer<typeof PaymentErrorUpdateSchema>;
