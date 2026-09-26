import { z } from 'zod';

export const UpdateVariantRequestSchema = z.object({
  variantId: z.string().min(1),
  name: z.string().min(1).max(100).optional(),
  price: z.number().nonnegative().optional(),
});

export type UpdateVariantRequestDTO = z.infer<typeof UpdateVariantRequestSchema>;
