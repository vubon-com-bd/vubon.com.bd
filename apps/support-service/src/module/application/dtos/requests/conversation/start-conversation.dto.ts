import { z } from 'zod';

export const StartConversationRequestSchema = z.object({
  userId: z.string().uuid(),
  type: z.string().min(1).max(50),
  initialMessage: z.string().max(5000).optional(),
});

export type StartConversationRequestDTO = z.infer<typeof StartConversationRequestSchema>;
