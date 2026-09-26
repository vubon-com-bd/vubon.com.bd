import { z } from 'zod';

export const UpdateOrderRequestSchema = z.object({
  orderId: z.string().min(1),
  note: z.string().max(500).optional(),
  channel: z.string().optional(),
  source: z.string().optional(),
});

export type UpdateOrderRequestDTO = z.infer<typeof UpdateOrderRequestSchema>;
