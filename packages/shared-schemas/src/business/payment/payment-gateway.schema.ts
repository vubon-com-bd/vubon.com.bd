/**
 * Payment Gateway Schema
 * পেমেন্ট গেটওয়ে সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PAYMENT_GATEWAYS } from '@vubon/shared-constants';

export const PaymentGatewaySchema = BaseSchema.extend({
  name: z.string().min(1, 'Gateway name is required'),
  nameBangla: z.string().optional(),
  code: z.enum(Object.values(PAYMENT_GATEWAYS) as [string, ...string[]]),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  isSandbox: z.boolean().default(false),
  config: z.record(z.union([z.string(), z.number(), z.boolean(), z.object({})])),
  supportedCurrencies: z.array(z.string()).default(['BDT']),
  supportedMethods: z.array(z.string()).default([]),
  feePercentage: z.number().min(0).default(0),
  feeFixed: z.number().min(0).default(0),
  minAmount: z.number().min(0).default(0),
  maxAmount: z.number().min(0).default(99999999),
  processingTime: z.number().int().min(0).default(0),
  webhookUrl: z.string().url().optional(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export const PaymentGatewayCreateSchema = PaymentGatewaySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const PaymentGatewayUpdateSchema = PaymentGatewayCreateSchema.partial();

export type PaymentGateway = z.infer<typeof PaymentGatewaySchema>;
export type PaymentGatewayCreate = z.infer<typeof PaymentGatewayCreateSchema>;
export type PaymentGatewayUpdate = z.infer<typeof PaymentGatewayUpdateSchema>;
