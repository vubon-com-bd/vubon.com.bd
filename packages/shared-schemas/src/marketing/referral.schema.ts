import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { ReferralRewardSchema } from './referral-reward.schema';
import { REFERRAL_STATUS } from '@vubon/shared-constants/src/marketing/referral-status.constants';

const referralStatusKeys = Object.keys(REFERRAL_STATUS) as [string, ...string[]];

export const ReferralSchema = BaseSchema.extend({
  referralId: z.string().uuid(),
  code: z.string().min(3).max(20),
  referrerId: z.string().uuid(),
  referrer: UserSchema,
  refereeId: z.string().uuid(),
  referee: UserSchema,
  status: z.enum(referralStatusKeys),
  reward: ReferralRewardSchema,
  isCompleted: z.boolean().default(false),
  isExpired: z.boolean().default(false),
  expiresAt: z.date(),
  completedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
