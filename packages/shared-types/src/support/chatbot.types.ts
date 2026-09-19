/**
 * Chatbot Types
 * @module shared-types/support
 */

import type { CHATBOT_TYPE, CHATBOT_STATUS, CHATBOT_INTENT } from '@vubon/shared-constants/support';
import type { BaseEntity } from '../common/base';
import type { UserId } from '../common/primitives';

export type ChatbotTypeValue = (typeof CHATBOT_TYPE)[keyof typeof CHATBOT_TYPE];

export type ChatbotStatusValue = (typeof CHATBOT_STATUS)[keyof typeof CHATBOT_STATUS];

export type ChatbotIntentValue = (typeof CHATBOT_INTENT)[keyof typeof CHATBOT_INTENT];

export interface Chatbot extends BaseEntity<string> {
  readonly name: string;
  readonly type: ChatbotTypeValue;
  readonly status: ChatbotStatusValue;
  readonly description?: string;
  readonly intents: readonly ChatbotIntentConfig[];
  readonly fallbackMessage: string;
  readonly handoffMessage?: string;
  readonly handoffEnabled: boolean;
  readonly languages: readonly string[];
  readonly createdBy: UserId;
}

export interface ChatbotIntentConfig {
  readonly intent: ChatbotIntentValue;
  readonly responses: readonly string[];
  readonly keywords?: readonly string[];
  readonly confidence: number;
  readonly isActive: boolean;
}

export interface ChatbotConversation {
  readonly id: string;
  readonly chatbotId: string;
  readonly userId?: UserId;
  readonly sessionId?: string;
  readonly messages: readonly ChatbotMessage[];
  readonly currentIntent?: ChatbotIntentValue;
  readonly handoffAt?: string;
  readonly satisfaction?: number;
  readonly startedAt: string;
  readonly endedAt?: string;
}

export interface ChatbotMessage {
  readonly id: string;
  readonly role: 'user' | 'bot' | 'system' | 'agent';
  readonly content: string;
  readonly intent?: ChatbotIntentValue;
  readonly confidence?: number;
  readonly occurredAt: string;
}
