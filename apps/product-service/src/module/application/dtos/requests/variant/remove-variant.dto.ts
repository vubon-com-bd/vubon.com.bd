import { z } from 'zod';

export const RemoveVariantRequestSchema = z.object({
  variantId: z.string().min(1),
});

export type RemoveVariantRequestDTO = z.infer<typeof RemoveVariantRequestSchema>;
