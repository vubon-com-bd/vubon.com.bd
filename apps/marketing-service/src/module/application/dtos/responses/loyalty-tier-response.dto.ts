import { z } from 'zod';
import { LoyaltyTierHistorySchema } from '@vubon/shared-schemas/marketing';

export type LoyaltyTierResponseDTO = z.infer<typeof LoyaltyTierHistorySchema>;
