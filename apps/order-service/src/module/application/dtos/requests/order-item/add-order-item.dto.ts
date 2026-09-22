import { z } from 'zod';

export const AddOrderItemRequestSchema = z.object({
  orderId: z.string().min(1),
  productId: z.string().min(1),
  variantId: z.string().optional(),
  productName: z.string().min(1).max(255),
  quantity: z.number().int().min(1).max(9999),
  price: z.number().nonnegative(),
});

export type AddOrderItemRequestDTO = z.infer<typeof AddOrderItemRequestSchema>;
