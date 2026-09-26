/**
 * UserNameVO — User display name value object
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Trimmed, 2–100 chars
 * - No control chars, no HTML tags
 * - Allows Unicode letters, spaces, hyphens, apostrophes
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { VALIDATION } from '@vubon/shared-constants/common';
import { InvalidNameError } from '../../errors/user.errors';

const FORBIDDEN = /[<>{}[\]\\/]|[\u0000-\u001F\u007F]/;

export class UserNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): UserNameVO {
    if (typeof raw !== 'string') {
      throw new InvalidNameError(String(raw));
    }
    const trimmed = raw.trim().replace(/\s+/g, ' ');

    if (trimmed.length < VALIDATION.NAME_MIN_LENGTH) {
      throw new InvalidNameError(`Name too short (min ${VALIDATION.NAME_MIN_LENGTH})`);
    }
    if (trimmed.length > VALIDATION.NAME_MAX_LENGTH) {
      throw new InvalidNameError(`Name too long (max ${VALIDATION.NAME_MAX_LENGTH})`);
    }
    if (FORBIDDEN.test(trimmed)) {
      throw new InvalidNameError('Name contains forbidden characters');
    }
    return new UserNameVO(trimmed);
  }

  get firstName(): string {
    return this.value.split(' ')[0] ?? this.value;
  }

  get initials(): string {
    return this.value
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join('');
  }
}
