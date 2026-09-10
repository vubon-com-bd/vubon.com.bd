import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { CONVERSATION } from '@vubon/shared-constants/src/support/conversation.constants';
import { MessageSchema } from './message.schema';

const conversationStatusKeys = Object.keys(CONVERSATION.STATUS) as [string, ...string[]];
const conversationTypeKeys = Object.keys(CONVERSATION.CONVERSATION_TYPES) as [string, ...string[]];

export const ConversationSchema = BaseSchema.extend({
  conversationId: z.string().uuid(),
  ticketId: z.string().uuid(),
  status: z.enum(conversationStatusKeys),
  type: z.enum(conversationTypeKeys),
  messages: z.array(MessageSchema),
  messageCount: z.number().int().min(0).default(0),
  lastMessageAt: z.date().optional(),
  lastMessageBy: z.string().uuid().optional(),
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
