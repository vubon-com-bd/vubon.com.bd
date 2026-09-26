import { z } from 'zod';

export const UpdateModelSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  version: z.string().min(1).max(50).optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  endpoint: z.string().url().nullable().optional(),
  description: z.string().max(2000).nullable().optional(),
});

export type UpdateModelRequestDTO = z.infer<typeof UpdateModelSchema>;
