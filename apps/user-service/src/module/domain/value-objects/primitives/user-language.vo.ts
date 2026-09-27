/**
 * UserLanguage Value Object
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { LANGUAGE } from '@vubon/shared-constants/common';

export type UserLanguageType = (typeof LANGUAGE)[keyof typeof LANGUAGE];

const LANGUAGE_VALUES: ReadonlySet<string> = new Set(Object.values(LANGUAGE));

export class UserLanguageVO extends BaseTypeVO<UserLanguageType> {
  private constructor(value: UserLanguageType) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return LANGUAGE_VALUES;
  }

  static create(raw: string): UserLanguageVO {
    if (typeof raw !== 'string') {
      throw new Error('UserLanguage must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!LANGUAGE_VALUES.has(normalized)) {
      throw new Error(
        `Invalid language: "${raw}". Allowed: ${[...LANGUAGE_VALUES].join(', ')}`
      );
    }
    return new UserLanguageVO(normalized as UserLanguageType);
  }
}
