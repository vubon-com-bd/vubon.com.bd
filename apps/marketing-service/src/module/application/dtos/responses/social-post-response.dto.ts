import { z } from 'zod';
import {
  SocialMediaPostSchema,
  SocialMediaAccountSchema,
  SocialMediaMetricsSchema,
} from '@vubon/shared-schemas/marketing';

export type SocialPostResponseDTO = z.infer<typeof SocialMediaPostSchema>;
export type SocialAccountResponseDTO = z.infer<typeof SocialMediaAccountSchema>;
export type SocialMetricsResponseDTO = z.infer<typeof SocialMediaMetricsSchema>;
