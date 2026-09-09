import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { Chatbot } from './chatbot.types';
import { Message } from './message.types';

export interface ChatbotConversation extends BaseEntity {
  conversationId: string;
  chatbotId: string;
  chatbot: Chatbot;
  userId: string;
  user: User;
  messages: Message[];
  messageCount: number;
  intentHistory: string[];
  currentIntent?: string;
  context: Record<string, unknown>;
  startedAt: Date;
  endedAt?: Date;
  isActive: boolean;
  isEnded: boolean;
  metadata: Record<string, unknown>;
}
