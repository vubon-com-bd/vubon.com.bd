import { z } from 'zod';

export const DuplicateProductRequestSchema = z.object({
  productId: z.string().min(1),
  newName: z.string().min(3).max(200),
});

export type DuplicateProductRequestDTO = z.infer<typeof DuplicateProductRequestSchema>;
