import { z } from 'zod';

export const ReturnResponseSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  customerId: z.string(),
  reason: z.string(),
  status: z.string(),
  approvedAt: z.string().nullable(),
  rejectedAt: z.string().nullable(),
  completedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ReturnResponseDTO = z.infer<typeof ReturnResponseSchema>;
