import { z } from 'zod';

export const OrderItemResponseSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  variantId: z.string().nullable(),
  productName: z.string(),
  quantity: z.number(),
  priceAtPurchase: z.number(),
  currency: z.string(),
  status: z.string(),
  lineTotal: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type OrderItemResponseDTO = z.infer<typeof OrderItemResponseSchema>;
