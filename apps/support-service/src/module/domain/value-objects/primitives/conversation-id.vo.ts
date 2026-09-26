/**
 * ConversationIdVO — Conversation aggregate identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'conv_';
const MIN_LENGTH = 8;
const MAX_LENGTH = 64;
const PATTERN = /^[a-zA-Z0-9_-]+$/;

export class ConversationIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ConversationIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ConversationId must be a string', 'conversationId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `ConversationId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'conversationId',
      );
    }
    if (!PATTERN.test(trimmed)) {
      throw new ValidationError(
        'ConversationId contains invalid characters',
        'conversationId',
      );
    }
    return new ConversationIdVO(trimmed);
  }

  static generate(): ConversationIdVO {
    const suffix = Date.now().toString(36);
    return ConversationIdVO.create(`${PREFIX}${suffix}`);
  }
}
