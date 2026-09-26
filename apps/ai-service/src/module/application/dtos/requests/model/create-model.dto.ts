import { z } from 'zod';

export const CreateModelSchema = z.object({
  name: z.string().min(1).max(100),
  version: z.string().min(1).max(50).default('1.0.0'),
  type: z.string().min(1),
  providerId: z.string().uuid(),
  endpoint: z.string().url().nullable().optional(),
  description: z.string().max(2000).nullable().optional(),
});

export type CreateModelRequestDTO = z.infer<typeof CreateModelSchema>;
