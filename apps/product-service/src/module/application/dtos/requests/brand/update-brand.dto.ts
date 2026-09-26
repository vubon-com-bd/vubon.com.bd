import { z } from 'zod';

export const UpdateBrandRequestSchema = z.object({
  brandId: z.string().min(1),
  name: z.string().min(1).max(100).optional(),
  logo: z.string().url().nullable().optional(),
});

export type UpdateBrandRequestDTO = z.infer<typeof UpdateBrandRequestSchema>;
