/**
 * TrainIntentRequestDTO
 * @module support-service/application/dtos/requests/chatbot
 */
import type { ChatbotIntentValue } from '@vubon/shared-types/support';

export interface TrainIntentRequestDTO {
  readonly chatbotId: string;
  readonly intent: ChatbotIntentValue;
  readonly responses: readonly string[];
  readonly keywords?: readonly string[];
  readonly confidence?: number;
}
