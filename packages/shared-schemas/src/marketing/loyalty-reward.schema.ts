import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { LOYALTY_REWARD } from '@vubon/shared-constants/src/marketing/loyalty-reward.constants';

const loyaltyRewardTypeKeys = Object.keys(LOYALTY_REWARD.TYPES) as [string, ...string[]];

export const LoyaltyRewardSchema = BaseSchema.extend({
  rewardId: z.string().uuid(),
  loyaltyId: z.string().uuid(),
  type: z.enum(loyaltyRewardTypeKeys),
  value: z.unknown(),
  pointsCost: z.number().int().min(0),
  discount: z.number().min(0).max(100),
  isActive: z.boolean().default(true),
  isRedeemed: z.boolean().default(false),
  redeemedAt: z.date().optional(),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
