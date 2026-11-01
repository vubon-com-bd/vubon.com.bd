/**
 * UserBio Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { USER_PROFILE } from '@vubon/shared-constants/user';

export class UserBioVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserBioVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('UserBio must be a string', 'bio');
    }
    const normalized = raw.trim();
    if (normalized.length > USER_PROFILE.BIO_MAX_LENGTH) {
      throw new ValidationError(
        `UserBio exceeds max length (${USER_PROFILE.BIO_MAX_LENGTH})`,
        'bio',
      );
    }
    return new UserBioVO(normalized);
  }

  static empty(): UserBioVO {
    return new UserBioVO('');
  }

  static reconstitute(raw: string): UserBioVO {
    return new UserBioVO(raw);
  }

  get isEmpty(): boolean { return this.value.length === 0; }
  get length(): number { return this.value.length; }
  get maxLength(): number { return USER_PROFILE.BIO_MAX_LENGTH; }
}
