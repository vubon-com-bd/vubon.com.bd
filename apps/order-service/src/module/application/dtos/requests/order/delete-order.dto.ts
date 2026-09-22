import { z } from 'zod';

export const DeleteOrderRequestSchema = z.object({
  orderId: z.string().min(1),
});

export type DeleteOrderRequestDTO = z.infer<typeof DeleteOrderRequestSchema>;
