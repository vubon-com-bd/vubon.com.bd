/**
 * LiveChatIdVO — Live chat session identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'lc_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class LiveChatIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): LiveChatIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('LiveChatId must be a string', 'liveChatId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `LiveChatId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'liveChatId',
      );
    }
    return new LiveChatIdVO(trimmed);
  }

  static generate(): LiveChatIdVO {
    const suffix = Date.now().toString(36);
    return LiveChatIdVO.create(`${PREFIX}${suffix}`);
  }
}
