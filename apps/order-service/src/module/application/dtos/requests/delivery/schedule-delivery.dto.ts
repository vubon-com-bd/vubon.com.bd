import { z } from 'zod';

export const ScheduleDeliveryRequestSchema = z.object({
  orderId: z.string().min(1),
  deliveryType: z.string().min(1),
  methodId: z.string().optional(),
  scheduledAt: z.string().datetime().optional(),
});

export type ScheduleDeliveryRequestDTO = z.infer<typeof ScheduleDeliveryRequestSchema>;
