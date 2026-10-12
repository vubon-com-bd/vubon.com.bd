/**
 * UserGender Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { USER_GENDER } from '@vubon/shared-constants/user';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_GENDERS: readonly string[] = Object.values(USER_GENDER);

export class UserGenderVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserGenderVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserGender cannot be empty', 'gender');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_GENDERS.includes(normalized)) {
      throw new ValidationError(
        `Invalid UserGender "${normalized}". Allowed: ${VALID_GENDERS.join(', ')}`,
        'gender',
      );
    }
    return new UserGenderVO(normalized);
  }

  static male(): UserGenderVO { return new UserGenderVO(USER_GENDER.MALE); }
  static female(): UserGenderVO { return new UserGenderVO(USER_GENDER.FEMALE); }
  static other(): UserGenderVO { return new UserGenderVO(USER_GENDER.OTHER); }
  static preferNotToSay(): UserGenderVO {
    return new UserGenderVO(USER_GENDER.PREFER_NOT_TO_SAY);
  }

  static reconstitute(raw: string): UserGenderVO {
    return new UserGenderVO(raw);
  }

  isMale(): boolean { return this.value === USER_GENDER.MALE; }
  isFemale(): boolean { return this.value === USER_GENDER.FEMALE; }
  isOther(): boolean { return this.value === USER_GENDER.OTHER; }
  isPreferNotToSay(): boolean { return this.value === USER_GENDER.PREFER_NOT_TO_SAY; }
}
