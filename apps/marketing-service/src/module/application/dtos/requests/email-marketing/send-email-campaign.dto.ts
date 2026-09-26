import { z } from 'zod';

export const SendEmailCampaignRequestSchema = z.object({
  campaignId: z.string().uuid(),
  recipientIds: z.array(z.string().uuid()).optional(),
});

export type SendEmailCampaignRequestDTO = z.infer<typeof SendEmailCampaignRequestSchema>;
