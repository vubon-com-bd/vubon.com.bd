import { z } from 'zod';
import {
  LoyaltyRewardSchema,
  LoyaltyRewardRedemptionSchema,
} from '@vubon/shared-schemas/marketing';

export type LoyaltyRewardResponseDTO = z.infer<typeof LoyaltyRewardSchema>;
export type LoyaltyRewardRedemptionResponseDTO = z.infer<typeof LoyaltyRewardRedemptionSchema>;
