import { z } from 'zod';

export const UpdateVisibilityRequestSchema = z.object({
  userId: z.string().min(1),
  visibility: z.enum(['public', 'private', 'friends']),
});

export type UpdateVisibilityRequestDTO = z.infer<typeof UpdateVisibilityRequestSchema>;
