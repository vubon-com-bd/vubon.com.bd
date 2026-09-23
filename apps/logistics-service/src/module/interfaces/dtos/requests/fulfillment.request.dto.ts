import { z } from 'zod';

export const StartFulfillmentRequestSchema = z.object({
  orderId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  type: z.enum(['standard', 'express', 'priority', 'bulk']).default('standard'),
  strategy: z.string().optional(),
});

export type StartFulfillmentRequestDTO = z.infer<typeof StartFulfillmentRequestSchema>;
