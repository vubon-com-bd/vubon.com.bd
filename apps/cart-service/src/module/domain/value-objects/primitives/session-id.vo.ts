/**
 * SessionId Value Object (cross-service reference)
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 8;
const MAX_LENGTH = 128;

export class SessionIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SessionIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('SessionId must be a string', 'sessionId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `SessionId must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'sessionId',
      );
    }
    return new SessionIdVO(trimmed);
  }

  static reconstitute(raw: string): SessionIdVO {
    return new SessionIdVO(raw);
  }
}
