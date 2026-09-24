import { z } from 'zod';

export const MarkMessageReadRequestSchema = z.object({
  messageId: z.string().uuid(),
});

export type MarkMessageReadRequestDTO = z.infer<typeof MarkMessageReadRequestSchema>;
