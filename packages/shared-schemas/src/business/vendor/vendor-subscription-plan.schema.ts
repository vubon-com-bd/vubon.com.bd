import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { VENDOR_SUBSCRIPTION_PLAN } from '@vubon/shared-constants/src/business/vendor/vendor-subscription-plan.constants';
import { VendorFeatureSchema } from './vendor-feature.schema';

const vendorSubscriptionPlanTypeKeys = Object.keys(VENDOR_SUBSCRIPTION_PLAN.TYPES) as [
  string,
  ...string[],
];

export const VendorSubscriptionPlanSchema = BaseSchema.extend({
  planId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  tier: z.enum(vendorSubscriptionPlanTypeKeys),
  price: MoneySchema,
  billingPeriod: z.enum(['monthly', 'quarterly', 'annual']),
  features: z.array(VendorFeatureSchema),
  maxProducts: z.number().int().min(0),
  maxTeamMembers: z.number().int().min(0),
  maxStorage: z.number().int().min(0),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
