import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { LOYALTY_STATUS } from '@vubon/shared-constants/src/marketing/loyalty-status.constants';

const loyaltyStatusKeys = Object.keys(LOYALTY_STATUS) as [string, ...string[]];

export const LoyaltyStatusSchema = StatusSchema.extend({
  status: z.enum(loyaltyStatusKeys),
  category: z.literal('loyalty'),
  isActive: z.boolean().default(false),
  isInactive: z.boolean().default(false),
  isSuspended: z.boolean().default(false),
  isExpired: z.boolean().default(false),
});

export const LoyaltyStatusEnumSchema = z.enum(loyaltyStatusKeys);
