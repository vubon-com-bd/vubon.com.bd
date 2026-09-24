import { z } from 'zod';

export const StartChatRequestSchema = z.object({
  userId: z.string().uuid(),
  type: z.string().min(1).max(50).optional(),
  initialMessage: z.string().max(5000).optional(),
});

export type StartChatRequestDTO = z.infer<typeof StartChatRequestSchema>;
