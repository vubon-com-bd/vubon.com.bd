/**
 * UserGender Value Object
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { USER_GENDER } from '@vubon/shared-constants/user';

export type UserGenderType = (typeof USER_GENDER)[keyof typeof USER_GENDER];

const USER_GENDER_VALUES: ReadonlySet<string> = new Set(Object.values(USER_GENDER));

export class UserGenderVO extends BaseTypeVO<UserGenderType> {
  private constructor(value: UserGenderType) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return USER_GENDER_VALUES;
  }

  static create(raw: string): UserGenderVO {
    if (typeof raw !== 'string') {
      throw new Error('UserGender must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!USER_GENDER_VALUES.has(normalized)) {
      throw new Error(
        `Invalid gender: "${raw}". Allowed: ${[...USER_GENDER_VALUES].join(', ')}`
      );
    }
    return new UserGenderVO(normalized as UserGenderType);
  }
}
