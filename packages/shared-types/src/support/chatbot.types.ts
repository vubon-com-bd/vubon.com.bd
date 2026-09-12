import { BaseEntity } from '../common/base.types';
import { CHATBOT } from '@vubon/shared-constants/src/support/chatbot.constants';
import { ChatbotIntent } from './chatbot-intent.types';
import { ChatbotEntity } from './chatbot-entity.types';
import { ChatbotContext } from './chatbot-context.types';
import { ChatbotConversation } from './chatbot-conversation.types';

export interface Chatbot extends BaseEntity {
  chatbotId: string;
  name: string;
  description?: string;
  status: keyof typeof CHATBOT.STATUS | string;
  type: keyof typeof CHATBOT.CHATBOT_TYPES | string;
  intents: ChatbotIntent[];
  entities: ChatbotEntity[];
  contexts: ChatbotContext[];
  conversations: ChatbotConversation[];
  confidenceThreshold: number;
  maxRetryAttempts: number;
  sessionTimeoutMinutes: number;
  isActive: boolean;
  isTraining: boolean;
  isError: boolean;
  metadata: Record<string, unknown>;
}
