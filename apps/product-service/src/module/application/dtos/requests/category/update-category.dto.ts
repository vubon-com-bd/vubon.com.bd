import { z } from 'zod';

export const UpdateCategoryRequestSchema = z.object({
  categoryId: z.string().min(1),
  name: z.string().min(1).max(100).optional(),
  parentId: z.string().nullable().optional(),
});

export type UpdateCategoryRequestDTO = z.infer<typeof UpdateCategoryRequestSchema>;
