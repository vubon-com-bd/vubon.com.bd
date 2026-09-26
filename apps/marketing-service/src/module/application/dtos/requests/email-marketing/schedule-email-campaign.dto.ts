import { z } from 'zod';

export const ScheduleEmailCampaignRequestSchema = z.object({
  campaignId: z.string().uuid(),
  scheduledAt: z.string().datetime(),
});

export type ScheduleEmailCampaignRequestDTO = z.infer<typeof ScheduleEmailCampaignRequestSchema>;
