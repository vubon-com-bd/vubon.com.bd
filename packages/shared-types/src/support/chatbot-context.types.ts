import { BaseEntity } from '../common/base.types';
import { Chatbot } from './chatbot.types';

export interface ContextVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  defaultValue?: unknown;
  required: boolean;
}

export interface ChatbotContext extends BaseEntity {
  contextId: string;
  chatbotId: string;
  chatbot: Chatbot;
  name: string;
  description?: string;
  variables: ContextVariable[];
  lifetime: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
