/**
 * UserName Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { VALIDATION } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN = VALIDATION.NAME_MIN_LENGTH;
const MAX = VALIDATION.NAME_MAX_LENGTH;

export class UserNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('UserName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN || normalized.length > MAX) {
      throw new ValidationError(
        `UserName must be ${MIN}-${MAX} chars`,
        'name',
      );
    }
    if (!/^[\p{L}\p{N}\s'._-]+$/u.test(normalized)) {
      throw new ValidationError('UserName contains invalid characters', 'name');
    }
    return new UserNameVO(normalized);
  }

  static reconstitute(raw: string): UserNameVO {
    return new UserNameVO(raw);
  }

  get initials(): string {
    return this.value
      .split(' ')
      .map((p) => p.charAt(0).toUpperCase())
      .join('');
  }
}
