import { z } from 'zod';
import {
  SmsMarketingSchema,
  SmsMarketingPublicSchema,
  SmsMarketingStatsSchema,
} from '@vubon/shared-schemas/marketing';

export type SmsCampaignResponseDTO = z.infer<typeof SmsMarketingSchema>;
export type SmsCampaignPublicResponseDTO = z.infer<typeof SmsMarketingPublicSchema>;
export type SmsCampaignStatsResponseDTO = z.infer<typeof SmsMarketingStatsSchema>;
