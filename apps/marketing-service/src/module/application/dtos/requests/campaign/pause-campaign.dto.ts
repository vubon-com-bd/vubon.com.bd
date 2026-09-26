import { z } from 'zod';

export const PauseCampaignRequestSchema = z.object({
  campaignId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export type PauseCampaignRequestDTO = z.infer<typeof PauseCampaignRequestSchema>;
