import { z } from 'zod';

export const SendSmsCampaignRequestSchema = z.object({
  campaignId: z.string().uuid(),
  recipientIds: z.array(z.string().uuid()).optional(),
});

export type SendSmsCampaignRequestDTO = z.infer<typeof SendSmsCampaignRequestSchema>;
