import { z } from 'zod';

export const PublishProductRequestSchema = z.object({
  productId: z.string().min(1),
});

export type PublishProductRequestDTO = z.infer<typeof PublishProductRequestSchema>;
