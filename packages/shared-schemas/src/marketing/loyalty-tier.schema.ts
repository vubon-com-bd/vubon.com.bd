import { z } from 'zod';
import { LOYALTY_TIER } from '@vubon/shared-constants/src/marketing/loyalty-tier.constants';

const loyaltyTierTypeKeys = Object.keys(LOYALTY_TIER.TYPES) as [string, ...string[]];

export const LoyaltyTierSchema = z.object({
  tier: z.enum(loyaltyTierTypeKeys),
  category: z.literal('loyalty_tier'),
  minPoints: z.number().int().min(0),
  discount: z.number().min(0).max(100),
  benefits: z.array(z.string()),
  isBasic: z.boolean().default(false),
  isSilver: z.boolean().default(false),
  isGold: z.boolean().default(false),
  isPlatinum: z.boolean().default(false),
  isDiamond: z.boolean().default(false),
});

export const LoyaltyTierEnumSchema = z.enum(loyaltyTierTypeKeys);
