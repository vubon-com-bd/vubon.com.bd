import { z } from 'zod';

export const CreateCategoryRequestSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  parentId: z.string().nullable().optional(),
});

export type CreateCategoryRequestDTO = z.infer<typeof CreateCategoryRequestSchema>;
