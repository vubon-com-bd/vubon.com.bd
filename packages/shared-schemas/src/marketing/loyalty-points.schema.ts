/**
 * Loyalty Points Schema
 * @module shared-schemas/marketing
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { LoyaltyPointTypeSchema, LoyaltyEarnRuleSchema } from './loyalty-status.schema';

export const LoyaltyPointsSchema = z.object({
  userId: UuidSchema,
  balance: z.number().int().nonnegative(),
  lifetimeEarned: z.number().int().nonnegative(),
  lifetimeRedeemed: z.number().int().nonnegative(),
  lifetimeExpired: z.number().int().nonnegative(),
  lastEarnedAt: z.string().datetime().optional(),
  lastRedeemedAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime(),
});

export const LoyaltyPointsTransactionSchema = z.object({
  id: z.string().min(1),
  userId: UuidSchema,
  type: LoyaltyPointTypeSchema,
  points: z.number().int(),
  balanceAfter: z.number().int().nonnegative(),
  rule: LoyaltyEarnRuleSchema.optional(),
  reference: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  expiresAt: z.string().datetime().optional(),
  occurredAt: z.string().datetime(),
});

export const LoyaltyPointsAdjustmentSchema = z.object({
  userId: UuidSchema,
  points: z.number().int(),
  reason: z.string().min(1).max(500),
  adjustedBy: z.string().min(1),
});

export type LoyaltyPointsSchemaType = z.infer<typeof LoyaltyPointsSchema>;
export type LoyaltyPointsTransactionSchemaType = z.infer<typeof LoyaltyPointsTransactionSchema>;
export type LoyaltyPointsAdjustmentSchemaType = z.infer<typeof LoyaltyPointsAdjustmentSchema>;
