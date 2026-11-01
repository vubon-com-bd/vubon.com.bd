/**
 * UserEmail Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseEmailVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class UserEmailVO extends BaseEmailVO {
  private constructor(value: string) {
    super(value as never);
  }

  static create(raw: string): UserEmailVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserEmail cannot be empty', 'email');
    }
    const normalized = raw.trim().toLowerCase();
    if (normalized.length > VALIDATION.EMAIL_MAX_LENGTH) {
      throw new ValidationError(
        `UserEmail exceeds max length (${VALIDATION.EMAIL_MAX_LENGTH})`,
        'email',
      );
    }
    if (!REGEX.EMAIL.test(normalized)) {
      throw new ValidationError('Invalid user email format', 'email');
    }
    return new UserEmailVO(normalized);
  }

  static reconstitute(raw: string): UserEmailVO {
    return new UserEmailVO(raw);
  }

  get domain(): string {
    return this.value.split('@')[1] ?? '';
  }

  get localPart(): string {
    return this.value.split('@')[0] ?? '';
  }
}
