import { z } from 'zod';

export const EndChatRequestSchema = z.object({
  chatId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export type EndChatRequestDTO = z.infer<typeof EndChatRequestSchema>;
