/**
 * ChatbotResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  ChatbotTypeValue,
  ChatbotStatusValue,
  ChatbotIntentValue,
} from '@vubon/shared-types/support';

export interface ChatbotIntentConfigResponseDTO {
  readonly intent: ChatbotIntentValue;
  readonly responses: readonly string[];
  readonly keywords?: readonly string[];
  readonly confidence: number;
  readonly isActive: boolean;
}

export interface ChatbotResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly type: ChatbotTypeValue;
  readonly status: ChatbotStatusValue;
  readonly description?: string;
  readonly intents: readonly ChatbotIntentConfigResponseDTO[];
  readonly fallbackMessage: string;
  readonly handoffMessage?: string;
  readonly handoffEnabled: boolean;
  readonly languages: readonly string[];
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
