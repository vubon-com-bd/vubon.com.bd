import { z } from 'zod';

export const RequestCancelRequestSchema = z.object({
  orderId: z.string().min(1),
  reason: z.string().min(1).max(500),
});

export type RequestCancelRequestDTO = z.infer<typeof RequestCancelRequestSchema>;
