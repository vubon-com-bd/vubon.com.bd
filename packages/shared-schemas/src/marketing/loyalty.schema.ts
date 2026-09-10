import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { LoyaltyPointsSchema } from './loyalty-points.schema';
import { LoyaltyTierSchema } from './loyalty-tier.schema';
import { LoyaltyRewardSchema } from './loyalty-reward.schema';
import { LOYALTY_STATUS } from '@vubon/shared-constants/src/marketing/loyalty-status.constants';

const loyaltyStatusKeys = Object.keys(LOYALTY_STATUS) as [string, ...string[]];

export const LoyaltySchema = BaseSchema.extend({
  loyaltyId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  status: z.enum(loyaltyStatusKeys),
  points: LoyaltyPointsSchema,
  tier: LoyaltyTierSchema,
  rewards: z.array(LoyaltyRewardSchema),
  totalPointsEarned: z.number().int().min(0).default(0),
  totalPointsSpent: z.number().int().min(0).default(0),
  availablePoints: z.number().int().min(0).default(0),
  lifetimeValue: z.number().min(0).default(0),
  joinDate: z.date(),
  lastActivityDate: z.date(),
  tierUpgradeDate: z.date().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
