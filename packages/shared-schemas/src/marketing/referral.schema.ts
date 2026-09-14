/**
 * Referral Core Schema
 * @module shared-schemas/marketing
 *
 * Referral entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { EmailSchema } from '../common/primitives/email.schema';
import { ReferralStatusSchema, ReferralTypeSchema } from './referral-status.schema';
import { ReferralRewardSchema } from './referral-reward.schema';

export const ReferralSchema = BaseEntitySchema.extend({
  referrerId: UuidSchema,
  refereeId: UuidSchema.optional(),
  refereeEmail: EmailSchema.optional(),
  code: z.string().min(6).max(32),
  type: ReferralTypeSchema,
  status: ReferralStatusSchema,
  referrerReward: ReferralRewardSchema.optional(),
  refereeReward: ReferralRewardSchema.optional(),
  qualifyingOrderId: UuidSchema.optional(),
  qualifyingAmount: z.number().nonnegative().optional(),
  currency: z.string().length(3),
  expiresAt: z.string().datetime(),
  qualifiedAt: z.string().datetime().optional(),
  rewardedAt: z.string().datetime().optional(),
});

export const ReferralPublicSchema = ReferralSchema.pick({
  id: true,
  code: true,
  status: true,
  createdAt: true,
  qualifiedAt: true,
});

export const ReferralListFilterSchema = z.object({
  referrerId: UuidSchema.optional(),
  refereeId: UuidSchema.optional(),
  status: ReferralStatusSchema.optional(),
  type: ReferralTypeSchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type ReferralSchemaType = z.infer<typeof ReferralSchema>;
export type ReferralPublicSchemaType = z.infer<typeof ReferralPublicSchema>;
export type ReferralListFilterSchemaType = z.infer<typeof ReferralListFilterSchema>;
