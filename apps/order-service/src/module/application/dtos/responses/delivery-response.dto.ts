import { z } from 'zod';

export const DeliveryResponseSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  status: z.string(),
  type: z.string(),
  methodId: z.string().nullable(),
  scheduledAt: z.string().nullable(),
  attemptedAt: z.string().nullable(),
  deliveredAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type DeliveryResponseDTO = z.infer<typeof DeliveryResponseSchema>;
