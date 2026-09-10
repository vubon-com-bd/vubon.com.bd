import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PAYMENT_METHOD } from '@vubon/shared-constants/src/business/payment/payment-method.constants';

const paymentMethodTypeKeys = Object.keys(PAYMENT_METHOD.TYPES) as [string, ...string[]];
const paymentMethodCategoryKeys = Object.keys(PAYMENT_METHOD.CATEGORIES) as [string, ...string[]];

export const PaymentMethodSchema = BaseSchema.extend({
  methodId: z.string().uuid(),
  type: z.enum(paymentMethodTypeKeys),
  category: z.enum(paymentMethodCategoryKeys),
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(50),
  icon: z.string().url().optional(),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  config: z.object({
    apiKey: z.string().optional(),
    apiSecret: z.string().optional(),
    merchantId: z.string().optional(),
    returnUrl: z.string().url(),
    cancelUrl: z.string().url(),
    webhookUrl: z.string().url(),
    timeout: z.number().int().min(1).default(30),
    retryAttempts: z.number().int().min(0).default(3),
  }),
  metadata: z.record(z.unknown()).optional(),
});
