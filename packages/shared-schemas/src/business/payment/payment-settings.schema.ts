import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';

export const PaymentSettingsSchema = BaseSchema.extend({
  settingsId: z.string().uuid(),
  key: z.string(),
  value: z.unknown(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const PaymentSettingsValuesSchema = z.object({
  enabledGateways: z.array(z.string()),
  defaultGateway: z.string(),
  currency: z.string().min(3).max(3),
  minPaymentAmount: z.number().min(0),
  maxPaymentAmount: z.number().min(0),
  paymentTimeout: z.number().int().min(1),
  retryAttempts: z.number().int().min(0),
  retryDelay: z.number().int().min(1),
  enableTestMode: z.boolean().default(false),
  testGateways: z.array(z.string()),
  webhookSecret: z.string(),
  apiVersion: z.string(),
});
