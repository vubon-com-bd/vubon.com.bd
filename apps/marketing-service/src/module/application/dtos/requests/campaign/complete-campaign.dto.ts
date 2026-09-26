import { z } from 'zod';

export const CompleteCampaignRequestSchema = z.object({
  campaignId: z.string().uuid(),
});

export type CompleteCampaignRequestDTO = z.infer<typeof CompleteCampaignRequestSchema>;
