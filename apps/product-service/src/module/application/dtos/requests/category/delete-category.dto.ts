import { z } from 'zod';

export const DeleteCategoryRequestSchema = z.object({
  categoryId: z.string().min(1),
});

export type DeleteCategoryRequestDTO = z.infer<typeof DeleteCategoryRequestSchema>;
