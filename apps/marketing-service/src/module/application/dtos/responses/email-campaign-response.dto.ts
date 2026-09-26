import { z } from 'zod';
import {
  EmailMarketingSchema,
  EmailMarketingPublicSchema,
  EmailMarketingStatsSchema,
} from '@vubon/shared-schemas/marketing';

export type EmailCampaignResponseDTO = z.infer<typeof EmailMarketingSchema>;
export type EmailCampaignPublicResponseDTO = z.infer<typeof EmailMarketingPublicSchema>;
export type EmailCampaignStatsResponseDTO = z.infer<typeof EmailMarketingStatsSchema>;
