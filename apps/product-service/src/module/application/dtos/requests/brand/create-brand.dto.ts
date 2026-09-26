import { z } from 'zod';

export const CreateBrandRequestSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  logo: z.string().url().optional(),
});

export type CreateBrandRequestDTO = z.infer<typeof CreateBrandRequestSchema>;
