import { z } from 'zod';

export const OrderResponseSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  customerId: z.string(),
  vendorId: z.string().nullable(),
  status: z.string(),
  channel: z.string(),
  source: z.string(),
  subtotal: z.number(),
  discount: z.number(),
  tax: z.number(),
  shipping: z.number(),
  total: z.number(),
  currency: z.string(),
  note: z.string().nullable(),
  paymentId: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type OrderResponseDTO = z.infer<typeof OrderResponseSchema>;
