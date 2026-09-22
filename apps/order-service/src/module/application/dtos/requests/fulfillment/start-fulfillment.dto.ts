import { z } from 'zod';

export const StartFulfillmentRequestSchema = z.object({
  orderId: z.string().min(1),
  vendorId: z.string().optional(),
});

export type StartFulfillmentRequestDTO = z.infer<typeof StartFulfillmentRequestSchema>;
