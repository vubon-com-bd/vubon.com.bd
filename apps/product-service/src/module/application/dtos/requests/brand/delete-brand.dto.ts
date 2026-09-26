import { z } from 'zod';

export const DeleteBrandRequestSchema = z.object({
  brandId: z.string().min(1),
});

export type DeleteBrandRequestDTO = z.infer<typeof DeleteBrandRequestSchema>;
