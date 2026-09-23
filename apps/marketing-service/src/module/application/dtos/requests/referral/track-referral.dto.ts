import { z } from 'zod';

export const TrackReferralRequestSchema = z.object({
  code: z.string().min(1),
  refereeId: z.string().uuid().optional(),
});

export type TrackReferralRequestDTO = z.infer<typeof TrackReferralRequestSchema>;
