/**
 * ChatbotResponseService — Produce responses from classified intents
 * @module support-service/domain/services
 */
import { ChatbotEntity } from '../entities/chatbot.entity';
import { ChatbotIntentEntity } from '../entities/chatbot-intent.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface ChatbotReply {
  readonly text: string;
  readonly intentId: string;
  readonly confidence: number;
  readonly shouldEscalate: boolean;
}

const FALLBACK_TEXT = 'Sorry, I could not understand. A human agent will assist you shortly.';

export class ChatbotResponseService {
  respond(
    chatbot: ChatbotEntity,
    best: ChatbotIntentEntity | null,
    confidence: number,
  ): ChatbotReply {
    if (!chatbot.isOperational) {
      throw new BusinessRuleError(
        'Chatbot is not operational',
        'chatbotResponse.not_operational',
      );
    }

    if (!best) {
      return {
        text: FALLBACK_TEXT,
        intentId: '',
        confidence: 0,
        shouldEscalate: true,
      };
    }

    const meets = chatbot.meetsConfidence(confidence);
    return {
      text: meets ? best.response : FALLBACK_TEXT,
      intentId: best.id.value,
      confidence,
      shouldEscalate: !meets,
    };
  }

  shouldEscalate(chatbot: ChatbotEntity, confidence: number): boolean {
    return !chatbot.meetsConfidence(confidence);
  }

  fallback(): string {
    return FALLBACK_TEXT;
  }
}
