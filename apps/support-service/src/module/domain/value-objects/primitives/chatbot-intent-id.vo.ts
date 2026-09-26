/**
 * ChatbotIntentIdVO — Chatbot intent identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'intent_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class ChatbotIntentIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ChatbotIntentIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ChatbotIntentId must be a string', 'chatbotIntentId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `ChatbotIntentId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'chatbotIntentId',
      );
    }
    return new ChatbotIntentIdVO(trimmed);
  }

  static fromSlug(slug: string): ChatbotIntentIdVO {
    if (!slug || slug.trim().length === 0) {
      throw new ValidationError('ChatbotIntentId slug required', 'chatbotIntentId');
    }
    const normalized = slug.trim().toLowerCase().replace(/\s+/g, '_');
    return ChatbotIntentIdVO.create(`${PREFIX}${normalized}`);
  }
}
