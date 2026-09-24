import { z } from 'zod';

export const TransferChatRequestSchema = z.object({
  chatId: z.string().uuid(),
  agentId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export type TransferChatRequestDTO = z.infer<typeof TransferChatRequestSchema>;
