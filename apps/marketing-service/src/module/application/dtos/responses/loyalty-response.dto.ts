import { z } from 'zod';
import {
  LoyaltySchema,
  LoyaltyPublicSchema,
  LoyaltyStatsSchema,
} from '@vubon/shared-schemas/marketing';

export type LoyaltyResponseDTO = z.infer<typeof LoyaltySchema>;
export type LoyaltyPublicResponseDTO = z.infer<typeof LoyaltyPublicSchema>;
export type LoyaltyStatsResponseDTO = z.infer<typeof LoyaltyStatsSchema>;
