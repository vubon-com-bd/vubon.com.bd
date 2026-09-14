/**
 * Loyalty Reward Schema
 * @module shared-schemas/marketing
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { MoneySchema } from '../common/primitives/money.schema';
import { LoyaltyTierSchema } from './loyalty-status.schema';

export const LoyaltyRewardTypeSchema = z.enum([
  'discount',
  'free_shipping',
  'free_product',
  'cashback',
  'points',
  'gift_card',
  'exclusive_access',
]);

export const LoyaltyRewardSchema = z.object({
  id: UuidSchema,
  name: z.string().min(1).max(150),
  description: z.string().max(1000).optional(),
  type: LoyaltyRewardTypeSchema,
  pointsCost: z.number().int().positive(),
  value: MoneySchema.optional(),
  percent: z.number().min(0).max(100).optional(),
  currency: z.string().length(3).optional(),
  minimumTier: LoyaltyTierSchema.optional(),
  isActive: z.boolean(),
  stock: z.number().int().nonnegative().optional(),
  expiresAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
});

export const LoyaltyRewardRedemptionSchema = z.object({
  id: UuidSchema,
  rewardId: UuidSchema,
  userId: UuidSchema,
  pointsSpent: z.number().int().positive(),
  code: z.string().max(50).optional(),
  redeemedAt: z.string().datetime(),
  usedAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
});

export type LoyaltyRewardTypeSchemaType = z.infer<typeof LoyaltyRewardTypeSchema>;
export type LoyaltyRewardSchemaType = z.infer<typeof LoyaltyRewardSchema>;
export type LoyaltyRewardRedemptionSchemaType = z.infer<typeof LoyaltyRewardRedemptionSchema>;
