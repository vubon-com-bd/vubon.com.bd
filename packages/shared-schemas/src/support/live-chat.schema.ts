import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { LiveChatSessionSchema } from './live-chat-session.schema';
import { MessageSchema } from './message.schema';
import { SupportAgentSchema } from './support-agent.schema';
import { LIVE_CHAT } from '@vubon/shared-constants/src/support/live-chat.constants';

const liveChatStatusKeys = Object.keys(LIVE_CHAT.STATUS) as [string, ...string[]];
const liveChatTypeKeys = Object.keys(LIVE_CHAT.CHAT_TYPES) as [string, ...string[]];

export const LiveChatSchema = BaseSchema.extend({
  chatId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  status: z.enum(liveChatStatusKeys),
  type: z.enum(liveChatTypeKeys),
  session: LiveChatSessionSchema,
  messages: z.array(MessageSchema),
  messageCount: z.number().int().min(0).default(0),
  assignedTo: z.string().uuid().optional(),
  assignedToAgent: SupportAgentSchema.optional(),
  startedAt: z.date(),
  endedAt: z.date().optional(),
  isActive: z.boolean().default(true),
  isEnded: z.boolean().default(false),
  rating: z.number().min(0).max(5).optional(),
  feedback: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
