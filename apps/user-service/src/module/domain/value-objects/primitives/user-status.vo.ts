/**
 * UserStatus Value Object
 * @module user-service/domain/value-objects/primitives
 *
 * Valid statuses come from USER_STATUS constants.
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { USER_STATUS } from '@vubon/shared-constants/user';

export type UserStatusType = (typeof USER_STATUS)[keyof typeof USER_STATUS];

const USER_STATUS_VALUES: ReadonlySet<string> = new Set(Object.values(USER_STATUS));

export class UserStatusVO extends BaseStatusVO<UserStatusType> {
  private constructor(value: UserStatusType) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return USER_STATUS_VALUES;
  }

  static create(raw: string): UserStatusVO {
    if (typeof raw !== 'string') {
      throw new Error('UserStatus must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!USER_STATUS_VALUES.has(normalized)) {
      throw new Error(
        `Invalid user status: "${raw}". Allowed: ${[...USER_STATUS_VALUES].join(', ')}`
      );
    }
    return new UserStatusVO(normalized as UserStatusType);
  }

  static active(): UserStatusVO {
    return new UserStatusVO(USER_STATUS.ACTIVE as UserStatusType);
  }

  static inactive(): UserStatusVO {
    return new UserStatusVO(USER_STATUS.INACTIVE as UserStatusType);
  }

  static pending(): UserStatusVO {
    return new UserStatusVO(USER_STATUS.PENDING as UserStatusType);
  }

  static suspended(): UserStatusVO {
    return new UserStatusVO(USER_STATUS.SUSPENDED as UserStatusType);
  }

  isSuspended(): boolean {
    return this.value === USER_STATUS.SUSPENDED;
  }

  isPending(): boolean {
    return this.value === USER_STATUS.PENDING;
  }

  isBlocked(): boolean {
    return this.value === USER_STATUS.BLOCKED;
  }

  canLogin(): boolean {
    return this.value === USER_STATUS.ACTIVE;
  }
}
