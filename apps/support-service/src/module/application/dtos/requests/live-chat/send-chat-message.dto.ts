import { z } from 'zod';

export const SendChatMessageRequestSchema = z.object({
  chatId: z.string().uuid(),
  content: z.string().min(1).max(10000),
  type: z.string().optional(),
});

export type SendChatMessageRequestDTO = z.infer<typeof SendChatMessageRequestSchema>;
