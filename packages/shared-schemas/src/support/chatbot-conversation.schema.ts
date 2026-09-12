import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { MessageSchema } from './message.schema';

export const ChatbotConversationSchema = BaseSchema.extend({
  conversationId: z.string().uuid(),
  chatbotId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  messages: z.array(MessageSchema),
  messageCount: z.number().int().min(0).default(0),
  intentHistory: z.array(z.string()),
  currentIntent: z.string().optional(),
  context: z.record(z.unknown()),
  startedAt: z.date(),
  endedAt: z.date().optional(),
  isActive: z.boolean().default(true),
  isEnded: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
