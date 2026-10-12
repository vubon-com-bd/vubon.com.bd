/**
 * UserAgent Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class UserAgentVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 512;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserAgentVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserAgent cannot be empty', 'userAgent');
    }
    const normalized = raw.trim();
    if (normalized.length > UserAgentVO.MAX_LENGTH) {
      throw new ValidationError(
        `UserAgent exceeds max length (${UserAgentVO.MAX_LENGTH})`,
        'userAgent',
      );
    }
    return new UserAgentVO(normalized);
  }

  static reconstitute(raw: string): UserAgentVO {
    return new UserAgentVO(raw);
  }
}
