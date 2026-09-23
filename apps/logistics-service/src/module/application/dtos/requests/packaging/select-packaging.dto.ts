import { z } from 'zod';

export const SelectPackagingRequestSchema = z.object({
  weightKg: z.number().positive(),
  dimensions: z.string().optional(),
});

export type SelectPackagingRequestDTO = z.infer<typeof SelectPackagingRequestSchema>;
