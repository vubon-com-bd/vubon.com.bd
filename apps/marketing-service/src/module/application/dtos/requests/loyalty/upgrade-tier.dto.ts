import { z } from 'zod';
import { LoyaltyTierSchema } from '@vubon/shared-schemas/marketing';

export const UpgradeTierRequestSchema = z.object({
  userId: z.string().uuid(),
  targetTier: LoyaltyTierSchema,
});

export type UpgradeTierRequestDTO = z.infer<typeof UpgradeTierRequestSchema>;
