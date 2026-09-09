import { BaseEntity } from '../common/base.types';
import { CHATBOT_INTENT } from '@vubon/shared-constants/src/support/chatbot-intent.constants';
import { Chatbot } from './chatbot.types';

export interface IntentParameter {
  name: string;
  entityType: string;
  required: boolean;
  prompt?: string;
}

export interface ChatbotIntent extends BaseEntity {
  intentId: string;
  chatbotId: string;
  chatbot: Chatbot;
  type: keyof typeof CHATBOT_INTENT.TYPES | string;
  name: string;
  description?: string;
  priority: keyof typeof CHATBOT_INTENT.INTENT_PRIORITY | string;
  trainingPhrases: string[];
  responses: string[];
  action?: string;
  parameters: IntentParameter[];
  isActive: boolean;
  metadata: Record<string, unknown>;
}
