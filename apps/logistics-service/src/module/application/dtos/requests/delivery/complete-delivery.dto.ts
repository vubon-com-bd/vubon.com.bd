import { z } from 'zod';

export const CompleteDeliveryRequestSchema = z.object({
  deliveryId: z.string().uuid(),
  signature: z.string().optional(),
  photoUrl: z.string().url().optional(),
  otp: z.string().regex(/^\d{4,8}$/).optional(),
});

export type CompleteDeliveryRequestDTO = z.infer<typeof CompleteDeliveryRequestSchema>;
