import { z } from 'zod';

export const RemoveTrackingRequestSchema = z.object({
  trackingId: z.string().min(1),
});

export type RemoveTrackingRequestDTO = z.infer<typeof RemoveTrackingRequestSchema>;
