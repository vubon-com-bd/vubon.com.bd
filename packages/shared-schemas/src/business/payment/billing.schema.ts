/**
 * Billing Schema
 * বিলিং সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';

export const BillingSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  orderId: z.string().uuid().optional(),
  paymentId: z.string().uuid().optional(),
  amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
  currency: z.string().default('BDT'),
  status: z.enum(['pending', 'paid', 'overdue', 'cancelled', 'refunded']),
  dueDate: z.date(),
  paidAt: z.date().optional(),
  billingAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    zipCode: z.string().min(1),
    division: z.string().min(1),
    district: z.string().min(1),
  }),
  note: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const BillingCreateSchema = BillingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const BillingUpdateSchema = BillingCreateSchema.partial();

export type Billing = z.infer<typeof BillingSchema>;
export type BillingCreate = z.infer<typeof BillingCreateSchema>;
export type BillingUpdate = z.infer<typeof BillingUpdateSchema>;
