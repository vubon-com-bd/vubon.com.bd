import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { VENDOR_SUBSCRIPTION } from '@vubon/shared-constants/src/business/vendor/vendor-subscription.constants';
import { VendorTierSchema } from './vendor-tier.schema';

const vendorSubscriptionStatusKeys = Object.keys(VENDOR_SUBSCRIPTION.STATUS) as [
  string,
  ...string[],
];
const vendorSubscriptionTypeKeys = Object.keys(VENDOR_SUBSCRIPTION.SUBSCRIPTION_TYPES) as [
  string,
  ...string[],
];

export const VendorSubscriptionSchema = BaseSchema.extend({
  subscriptionId: z.string().uuid(),
  vendorId: z.string().uuid(),
  status: z.enum(vendorSubscriptionStatusKeys),
  type: z.enum(vendorSubscriptionTypeKeys),
  tier: VendorTierSchema,
  price: MoneySchema,
  startDate: z.date(),
  endDate: z.date(),
  trialEndDate: z.date().optional(),
  isActive: z.boolean().default(true),
  isAutoRenew: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
