/**
 * Payment Method Schema
 * পেমেন্ট মেথড সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PAYMENT_METHODS } from '@vubon/shared-constants';

export const PaymentMethodSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  type: z.enum(Object.values(PAYMENT_METHODS) as [string, ...string[]]),
  name: z.string().min(1, 'Method name is required'),
  nameBangla: z.string().optional(),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  provider: z.string().optional(),
  accountNumber: z.string().optional(),
  accountName: z.string().optional(),
  bankName: z.string().optional(),
  branchName: z.string().optional(),
  routingNumber: z.string().optional(),
  swiftCode: z.string().optional(),
  cardLast4: z.string().length(4).optional(),
  cardBrand: z
    .enum(['visa', 'mastercard', 'amex', 'discover', 'diners', 'jcb', 'rupay', 'other'])
    .optional(),
  expiryMonth: z.number().int().min(1).max(12).optional(),
  expiryYear: z.number().int().min(2024).max(2035).optional(),
  billingAddress: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const PaymentMethodCreateSchema = PaymentMethodSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const PaymentMethodUpdateSchema = PaymentMethodCreateSchema.partial();

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type PaymentMethodCreate = z.infer<typeof PaymentMethodCreateSchema>;
export type PaymentMethodUpdate = z.infer<typeof PaymentMethodUpdateSchema>;
