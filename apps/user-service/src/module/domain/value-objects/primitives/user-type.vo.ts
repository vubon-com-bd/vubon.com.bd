/**
 * UserType Value Object
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { USER_TYPE } from '@vubon/shared-constants/user';

export type UserTypeType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

const USER_TYPE_VALUES: ReadonlySet<string> = new Set(Object.values(USER_TYPE));

export class UserTypeVO extends BaseTypeVO<UserTypeType> {
  private constructor(value: UserTypeType) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return USER_TYPE_VALUES;
  }

  static create(raw: string): UserTypeVO {
    if (typeof raw !== 'string') {
      throw new Error('UserType must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!USER_TYPE_VALUES.has(normalized)) {
      throw new Error(
        `Invalid user type: "${raw}". Allowed: ${[...USER_TYPE_VALUES].join(', ')}`
      );
    }
    return new UserTypeVO(normalized as UserTypeType);
  }

  isAdmin(): boolean {
    return this.value === USER_TYPE.ADMIN;
  }

  isVendor(): boolean {
    return this.value === USER_TYPE.VENDOR;
  }

  requiresKyc(): boolean {
    return (
      this.value === USER_TYPE.INDIVIDUAL ||
      this.value === USER_TYPE.BUSINESS ||
      this.value === USER_TYPE.VENDOR
    );
  }
}
