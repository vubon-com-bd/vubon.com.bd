/**
 * ChatbotIdVO — Chatbot configuration identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'bot_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class ChatbotIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ChatbotIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ChatbotId must be a string', 'chatbotId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `ChatbotId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'chatbotId',
      );
    }
    return new ChatbotIdVO(trimmed);
  }

  static generate(): ChatbotIdVO {
    const suffix = Date.now().toString(36);
    return ChatbotIdVO.create(`${PREFIX}${suffix}`);
  }
}
