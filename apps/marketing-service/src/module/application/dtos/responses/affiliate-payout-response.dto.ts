import { z } from 'zod';
import {
  AffiliatePayoutSchema,
  AffiliatePayoutPublicSchema,
} from '@vubon/shared-schemas/marketing';

export type AffiliatePayoutResponseDTO = z.infer<typeof AffiliatePayoutSchema>;
export type AffiliatePayoutPublicResponseDTO = z.infer<typeof AffiliatePayoutPublicSchema>;
