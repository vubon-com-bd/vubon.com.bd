import { z } from 'zod';
import { DeliveryScheduleInputSchema } from '@vubon/shared-schemas/logistics';

export type ScheduleDeliveryRequestDTO = z.infer<typeof DeliveryScheduleInputSchema>;

export const CompleteDeliveryRequestSchema = z.object({
  deliveryId: z.string().uuid(),
  signature: z.string().optional(),
  photoUrl: z.string().url().optional(),
  otp: z.string().regex(/^\d{4,8}$/).optional(),
});

export type CompleteDeliveryRequestDTO = z.infer<typeof CompleteDeliveryRequestSchema>;
