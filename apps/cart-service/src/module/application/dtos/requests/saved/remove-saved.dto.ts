import { z } from 'zod';

export const RemoveSavedRequestSchema = z.object({
  savedItemId: z.string().uuid(),
}).strict();

export type RemoveSavedRequestDTO = z.infer<typeof RemoveSavedRequestSchema>;
