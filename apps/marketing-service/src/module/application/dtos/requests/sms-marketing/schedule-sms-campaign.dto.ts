import { z } from 'zod';

export const ScheduleSmsCampaignRequestSchema = z.object({
  campaignId: z.string().uuid(),
  scheduledAt: z.string().datetime(),
});

export type ScheduleSmsCampaignRequestDTO = z.infer<typeof ScheduleSmsCampaignRequestSchema>;
