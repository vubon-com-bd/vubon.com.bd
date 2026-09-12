import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { REFERRAL_REWARD } from '@vubon/shared-constants/src/marketing/referral-reward.constants';
import { LoyaltyPointsSchema } from './loyalty-points.schema';

const referralRewardTypeKeys = Object.keys(REFERRAL_REWARD.TYPES) as [string, ...string[]];

export const ReferralRewardSchema = BaseSchema.extend({
  rewardId: z.string().uuid(),
  referralId: z.string().uuid(),
  type: z.enum(referralRewardTypeKeys),
  referrerAmount: MoneySchema,
  refereeAmount: MoneySchema,
  totalAmount: MoneySchema,
  points: LoyaltyPointsSchema,
  isClaimed: z.boolean().default(false),
  claimedAt: z.date().optional(),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
