/**
 * Payment Provider Schema
 * পেমেন্ট প্রোভাইডার সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';

export const PaymentProviderSchema = BaseSchema.extend({
  name: z.string().min(1, 'Provider name is required'),
  nameBangla: z.string().optional(),
  code: z.string().min(1, 'Provider code is required'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  config: z.record(z.union([z.string(), z.number(), z.boolean(), z.object({})])),
  supportedGateways: z.array(z.string()).default([]),
  supportedCurrencies: z.array(z.string()).default(['BDT']),
  feePercentage: z.number().min(0).default(0),
  feeFixed: z.number().min(0).default(0),
  processingTime: z.number().int().min(0).default(0),
});

export const PaymentProviderCreateSchema = PaymentProviderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const PaymentProviderUpdateSchema = PaymentProviderCreateSchema.partial();

export type PaymentProvider = z.infer<typeof PaymentProviderSchema>;
export type PaymentProviderCreate = z.infer<typeof PaymentProviderCreateSchema>;
export type PaymentProviderUpdate = z.infer<typeof PaymentProviderUpdateSchema>;
