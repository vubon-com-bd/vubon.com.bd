import { z } from 'zod';
import {
  ReferralSchema,
  ReferralPublicSchema,
} from '@vubon/shared-schemas/marketing';

export type ReferralResponseDTO = z.infer<typeof ReferralSchema>;
export type ReferralPublicResponseDTO = z.infer<typeof ReferralPublicSchema>;
