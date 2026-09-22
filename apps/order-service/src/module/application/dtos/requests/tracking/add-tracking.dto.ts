import { z } from 'zod';

export const AddTrackingRequestSchema = z.object({
  orderId: z.string().min(1),
  trackingNumber: z.string().min(6).max(32),
  carrier: z.string().min(1).max(100),
});

export type AddTrackingRequestDTO = z.infer<typeof AddTrackingRequestSchema>;
