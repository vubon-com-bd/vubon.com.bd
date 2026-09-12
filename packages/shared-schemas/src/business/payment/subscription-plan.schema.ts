import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';

export const SubscriptionPlanSchema = BaseSchema.extend({
  planId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  type: z.string(),
  price: MoneySchema,
  billingPeriod: z.enum(['monthly', 'quarterly', 'annual']),
  features: z.array(z.string()),
  maxProducts: z.number().int().min(0),
  maxTeamMembers: z.number().int().min(0),
  maxStorage: z.number().int().min(0),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
