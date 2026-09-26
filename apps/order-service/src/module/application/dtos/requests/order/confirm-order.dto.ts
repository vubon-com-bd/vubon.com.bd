import { z } from 'zod';

export const ConfirmOrderRequestSchema = z.object({
  orderId: z.string().min(1),
  paymentId: z.string().min(1),
});

export type ConfirmOrderRequestDTO = z.infer<typeof ConfirmOrderRequestSchema>;
