/**
 * SessionId Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class SessionIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SessionIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('SessionId cannot be empty', 'sessionId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('SessionId must be a valid UUID', 'sessionId');
    }
    return new SessionIdVO(trimmed);
  }

  static reconstitute(raw: string): SessionIdVO {
    return new SessionIdVO(raw);
  }
}
