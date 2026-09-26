/**
 * MessageIdVO — Message identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'msg_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;
const PATTERN = /^[a-zA-Z0-9_-]+$/;

export class MessageIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MessageIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('MessageId must be a string', 'messageId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `MessageId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'messageId',
      );
    }
    if (!PATTERN.test(trimmed)) {
      throw new ValidationError(
        'MessageId contains invalid characters',
        'messageId',
      );
    }
    return new MessageIdVO(trimmed);
  }

  static generate(): MessageIdVO {
    const suffix = Date.now().toString(36);
    return MessageIdVO.create(`${PREFIX}${suffix}`);
  }
}
