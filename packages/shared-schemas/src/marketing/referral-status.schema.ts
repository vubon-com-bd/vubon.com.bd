import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { REFERRAL_STATUS } from '@vubon/shared-constants/src/marketing/referral-status.constants';

const referralStatusKeys = Object.keys(REFERRAL_STATUS) as [string, ...string[]];

export const ReferralStatusSchema = StatusSchema.extend({
  status: z.enum(referralStatusKeys),
  category: z.literal('referral'),
  isPending: z.boolean().default(false),
  isActive: z.boolean().default(false),
  isCompleted: z.boolean().default(false),
  isExpired: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
});

export const ReferralStatusEnumSchema = z.enum(referralStatusKeys);
