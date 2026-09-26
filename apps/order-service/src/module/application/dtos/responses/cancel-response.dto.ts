import { z } from 'zod';

export const CancelResponseSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  customerId: z.string(),
  reason: z.string(),
  status: z.string(),
  approvedAt: z.string().nullable(),
  rejectedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CancelResponseDTO = z.infer<typeof CancelResponseSchema>;
