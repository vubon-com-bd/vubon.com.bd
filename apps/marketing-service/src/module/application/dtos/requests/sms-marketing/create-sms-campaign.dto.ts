import { z } from 'zod';

export const CreateSmsCampaignRequestSchema = z.object({
  name: z.string().min(1).max(200),
  content: z.string().min(1).max(480),
});

export type CreateSmsCampaignRequestDTO = z.infer<typeof CreateSmsCampaignRequestSchema>;
