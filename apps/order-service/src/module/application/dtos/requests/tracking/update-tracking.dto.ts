import { z } from 'zod';

export const UpdateTrackingRequestSchema = z.object({
  trackingId: z.string().min(1),
  status: z.string().min(1),
  event: z
    .object({
      description: z.string().max(500),
      location: z.string().max(200).optional(),
      occurredAt: z.string().datetime().optional(),
    })
    .optional(),
});

export type UpdateTrackingRequestDTO = z.infer<typeof UpdateTrackingRequestSchema>;
