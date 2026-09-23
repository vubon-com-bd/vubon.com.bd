import { z } from 'zod';

export const CreateEmailCampaignRequestSchema = z.object({
  name: z.string().min(1).max(200),
  subject: z.string().min(1).max(300),
  content: z.string().min(1),
  templateId: z.string().uuid().optional(),
});

export type CreateEmailCampaignRequestDTO = z.infer<typeof CreateEmailCampaignRequestSchema>;
