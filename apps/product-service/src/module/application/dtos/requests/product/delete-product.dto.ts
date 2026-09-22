import { z } from 'zod';

export const DeleteProductRequestSchema = z.object({
  productId: z.string().min(1),
});

export type DeleteProductRequestDTO = z.infer<typeof DeleteProductRequestSchema>;
