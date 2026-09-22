import { z } from 'zod';

export const AllocateFulfillmentRequestSchema = z.object({
  orderId: z.string().min(1),
  vendorId: z.string().optional(),
});

export type AllocateFulfillmentRequestDTO = z.infer<typeof AllocateFulfillmentRequestSchema>;
