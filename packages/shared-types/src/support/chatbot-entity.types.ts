import { BaseEntity } from '../common/base.types';
import { CHATBOT_ENTITY } from '@vubon/shared-constants/src/support/chatbot-entity.constants';
import { Chatbot } from './chatbot.types';

export interface ChatbotEntity extends BaseEntity {
  entityId: string;
  chatbotId: string;
  chatbot: Chatbot;
  type: keyof typeof CHATBOT_ENTITY.TYPES | string;
  name: string;
  description?: string;
  pattern?: string;
  synonyms: string[];
  isActive: boolean;
  metadata: Record<string, unknown>;
}
