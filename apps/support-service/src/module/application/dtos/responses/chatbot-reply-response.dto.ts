/**
 * ChatbotReplyResponseDTO
 * @module support-service/application/dtos/responses
 */
import type { ChatbotIntentValue } from '@vubon/shared-types/support';

export interface ChatbotReplyResponseDTO {
  readonly chatbotId: string;
  readonly sessionId?: string;
  readonly reply: string;
  readonly intent?: ChatbotIntentValue;
  readonly confidence: number;
  readonly shouldEscalate: boolean;
  readonly occurredAt: string;
}
