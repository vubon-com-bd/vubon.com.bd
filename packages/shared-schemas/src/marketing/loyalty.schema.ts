/**
 * Loyalty Core Schema
 * @module shared-schemas/marketing
 *
 * Loyalty entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { LoyaltyStatusSchema, LoyaltyTierSchema } from './loyalty-status.schema';
import { LoyaltyPointsSchema } from './loyalty-points.schema';

export const LoyaltySchema = BaseEntitySchema.extend({
  userId: UuidSchema,
  status: LoyaltyStatusSchema,
  tier: LoyaltyTierSchema,
  points: LoyaltyPointsSchema,
  tierExpiresAt: z.string().datetime().optional(),
  isEnrolled: z.boolean(),
  enrolledAt: z.string().datetime(),
  lastTierChangeAt: z.string().datetime().optional(),
});

export const LoyaltyPublicSchema = LoyaltySchema.pick({
  userId: true,
  status: true,
  tier: true,
  tierExpiresAt: true,
}).extend({
  points: z.number().int().nonnegative(),
});

export const LoyaltyListFilterSchema = z.object({
  status: LoyaltyStatusSchema.optional(),
  tier: LoyaltyTierSchema.optional(),
  minPoints: z.number().int().nonnegative().optional(),
  maxPoints: z.number().int().nonnegative().optional(),
  search: z.string().max(200).optional(),
});

export const LoyaltyStatsSchema = z.object({
  totalMembers: z.number().int().nonnegative(),
  activeMembers: z.number().int().nonnegative(),
  totalPointsIssued: z.number().int().nonnegative(),
  totalPointsRedeemed: z.number().int().nonnegative(),
  totalPointsExpired: z.number().int().nonnegative(),
  byTier: z.record(z.string(), z.number().int().nonnegative()),
});

export type LoyaltySchemaType = z.infer<typeof LoyaltySchema>;
export type LoyaltyPublicSchemaType = z.infer<typeof LoyaltyPublicSchema>;
export type LoyaltyListFilterSchemaType = z.infer<typeof LoyaltyListFilterSchema>;
export type LoyaltyStatsSchemaType = z.infer<typeof LoyaltyStatsSchema>;
