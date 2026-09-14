/**
 * Referral Reward Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/referral.constants থেকে।
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { MoneySchema } from '../common/primitives/money.schema';
import { ReferralRewardTypeSchema } from './referral-status.schema';

export const ReferralRewardSchema = z.object({
  type: ReferralRewardTypeSchema,
  amount: MoneySchema.optional(),
  percent: z.number().min(0).max(100).optional(),
  points: z.number().int().nonnegative().optional(),
  currency: z.string().length(3).optional(),
  expiresAt: z.string().datetime().optional(),
});

export const ReferralRewardGrantSchema = z.object({
  referralId: UuidSchema,
  userId: UuidSchema,
  reward: ReferralRewardSchema,
  grantedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  claimedAt: z.string().datetime().optional(),
});

export type ReferralRewardSchemaType = z.infer<typeof ReferralRewardSchema>;
export type ReferralRewardGrantSchemaType = z.infer<typeof ReferralRewardGrantSchema>;
