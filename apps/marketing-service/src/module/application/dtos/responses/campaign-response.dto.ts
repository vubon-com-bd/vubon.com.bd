import { z } from 'zod';
import {
  CampaignSchema,
  CampaignPublicSchema,
  CampaignSummarySchema,
  CampaignMetricsSchema,
} from '@vubon/shared-schemas/marketing';

export type CampaignResponseDTO = z.infer<typeof CampaignSchema>;
export type CampaignPublicResponseDTO = z.infer<typeof CampaignPublicSchema>;
export type CampaignSummaryResponseDTO = z.infer<typeof CampaignSummarySchema>;
export type CampaignMetricsResponseDTO = z.infer<typeof CampaignMetricsSchema>;
