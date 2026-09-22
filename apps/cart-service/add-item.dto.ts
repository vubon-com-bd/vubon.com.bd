import { z } from 'zod';

export const AddItemRequestSchema = z.object({
  cartId: z.string().uuid(),
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  vendorId: z.string().uuid().optional(),
  quantity: z.number().int().positive().max(999),
  note: z.string().max(500).optional(),
}).strict();

export type AddItemRequestDTO = z.infer<typeof AddItemRequestSchema>;
