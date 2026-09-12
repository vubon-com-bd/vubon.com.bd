import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { CHATBOT } from '@vubon/shared-constants/src/support/chatbot.constants';
import { ChatbotIntentSchema } from './chatbot-intent.schema';
import { ChatbotEntitySchema } from './chatbot-entity.schema';
import { ChatbotContextSchema } from './chatbot-context.schema';
import { ChatbotConversationSchema } from './chatbot-conversation.schema';

const chatbotStatusKeys = Object.keys(CHATBOT.STATUS) as [string, ...string[]];
const chatbotTypeKeys = Object.keys(CHATBOT.CHATBOT_TYPES) as [string, ...string[]];

export const ChatbotSchema = BaseSchema.extend({
  chatbotId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(chatbotStatusKeys),
  type: z.enum(chatbotTypeKeys),
  intents: z.array(ChatbotIntentSchema),
  entities: z.array(ChatbotEntitySchema),
  contexts: z.array(ChatbotContextSchema),
  conversations: z.array(ChatbotConversationSchema),
  confidenceThreshold: z.number().min(0).max(1).default(0.7),
  maxRetryAttempts: z.number().int().min(1).default(3),
  sessionTimeoutMinutes: z.number().int().min(1).default(15),
  isActive: z.boolean().default(true),
  isTraining: z.boolean().default(false),
  isError: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
