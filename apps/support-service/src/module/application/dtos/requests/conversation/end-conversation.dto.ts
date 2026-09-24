import { z } from 'zod';

export const EndConversationRequestSchema = z.object({
  conversationId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export type EndConversationRequestDTO = z.infer<typeof EndConversationRequestSchema>;
