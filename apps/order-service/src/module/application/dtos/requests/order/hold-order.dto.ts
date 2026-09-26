import { z } from 'zod';

export const HoldOrderRequestSchema = z.object({
  orderId: z.string().min(1),
  reason: z.string().min(1).max(500),
});

export type HoldOrderRequestDTO = z.infer<typeof HoldOrderRequestSchema>;
