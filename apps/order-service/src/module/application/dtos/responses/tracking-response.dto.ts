import { z } from 'zod';

export const TrackingResponseSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  status: z.string(),
  trackingNumber: z.string().nullable(),
  carrier: z.string().nullable(),
  events: z.array(z.record(z.string(), z.unknown())),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TrackingResponseDTO = z.infer<typeof TrackingResponseSchema>;
