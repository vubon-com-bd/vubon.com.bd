import { z } from 'zod';

export const OrderPublicResponseSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  status: z.string(),
  total: z.number(),
  currency: z.string(),
  createdAt: z.string(),
});

export type OrderPublicResponseDTO = z.infer<typeof OrderPublicResponseSchema>;
