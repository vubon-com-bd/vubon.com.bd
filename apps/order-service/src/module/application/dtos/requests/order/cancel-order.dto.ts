import { z } from 'zod';

export const CancelOrderRequestSchema = z.object({
  orderId: z.string().min(1),
  reason: z.string().min(1).max(500),
});

export type CancelOrderRequestDTO = z.infer<typeof CancelOrderRequestSchema>;
