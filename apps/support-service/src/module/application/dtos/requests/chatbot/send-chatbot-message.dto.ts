import { z } from 'zod';

export const SendChatbotMessageRequestSchema = z.object({
  chatbotId: z.string().uuid(),
  userId: z.string().uuid(),
  message: z.string().min(1).max(5000),
});

export type SendChatbotMessageRequestDTO = z.infer<typeof SendChatbotMessageRequestSchema>;
