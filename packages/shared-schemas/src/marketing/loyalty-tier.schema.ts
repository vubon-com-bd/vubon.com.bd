/**
 * Loyalty Tier Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/loyalty.constants থেকে।
 */

import { z } from 'zod';
import { LoyaltyTierSchema } from './loyalty-status.schema';

export const LoyaltyTierHistorySchema = z.object({
  userId: z.string().min(1),
  previousTier: LoyaltyTierSchema,
  newTier: LoyaltyTierSchema,
  reason: z.string().min(1).max(500),
  changedAt: z.string().datetime(),
});

export type LoyaltyTierHistorySchemaType = z.infer<typeof LoyaltyTierHistorySchema>;
