import { z } from 'zod';

export const ConfirmDeliveryRequestSchema = z.object({
  deliveryId: z.string().min(1),
  deliveredAt: z.string().datetime().optional(),
});

export type ConfirmDeliveryRequestDTO = z.infer<typeof ConfirmDeliveryRequestSchema>;
