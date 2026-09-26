import { z } from 'zod';

export const SetDefaultVariantRequestSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
});

export type SetDefaultVariantRequestDTO = z.infer<typeof SetDefaultVariantRequestSchema>;
