import { z } from 'zod';

export const LaunchCampaignRequestSchema = z.object({
  campaignId: z.string().uuid(),
  userId: z.string().uuid().optional(),
});

export type LaunchCampaignRequestDTO = z.infer<typeof LaunchCampaignRequestSchema>;
