import { z } from 'zod';

export const RequestReturnRequestSchema = z.object({
  orderId: z.string().min(1),
  reason: z.string().min(1).max(500),
  itemIds: z.array(z.string().min(1)).min(1).optional(),
});

export type RequestReturnRequestDTO = z.infer<typeof RequestReturnRequestSchema>;
