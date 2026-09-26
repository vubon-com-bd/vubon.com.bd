import { z } from 'zod';

export const ArchiveProductRequestSchema = z.object({
  productId: z.string().min(1),
});

export type ArchiveProductRequestDTO = z.infer<typeof ArchiveProductRequestSchema>;
