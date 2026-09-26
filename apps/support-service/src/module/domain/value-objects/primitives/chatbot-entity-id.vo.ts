/**
 * ChatbotEntityIdVO — Chatbot entity (slot) identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'ent_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class ChatbotEntityIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ChatbotEntityIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ChatbotEntityId must be a string', 'chatbotEntityId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `ChatbotEntityId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'chatbotEntityId',
      );
    }
    return new ChatbotEntityIdVO(trimmed);
  }

  static fromSlug(slug: string): ChatbotEntityIdVO {
    if (!slug || slug.trim().length === 0) {
      throw new ValidationError('ChatbotEntityId slug required', 'chatbotEntityId');
    }
    const normalized = slug.trim().toLowerCase().replace(/\s+/g, '_');
    return ChatbotEntityIdVO.create(`${PREFIX}${normalized}`);
  }
}
