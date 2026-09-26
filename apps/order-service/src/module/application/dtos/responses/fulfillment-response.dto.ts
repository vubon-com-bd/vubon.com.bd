import { z } from 'zod';

export const FulfillmentResponseSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  vendorId: z.string().nullable(),
  status: z.string(),
  startedAt: z.string().nullable(),
  packedAt: z.string().nullable(),
  shippedAt: z.string().nullable(),
  completedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type FulfillmentResponseDTO = z.infer<typeof FulfillmentResponseSchema>;
