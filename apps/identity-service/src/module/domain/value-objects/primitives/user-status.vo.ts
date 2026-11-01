/**
 * UserStatus Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { USER_STATUS } from '@vubon/shared-constants/user';
import { InvalidUserStatusError } from '../../errors/user.errors.js';

export type UserStatusValue =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'suspended'
  | 'blocked'
  | 'deleted'
  | 'deactivated'
  | 'unverified';

const VALID_STATUSES: readonly string[] = Object.values(USER_STATUS);

const VALID_TRANSITIONS: Readonly<Record<UserStatusValue, readonly UserStatusValue[]>> = {
  pending: ['active', 'unverified', 'blocked', 'deleted'],
  unverified: ['active', 'blocked', 'deleted'],
  active: ['inactive', 'suspended', 'blocked', 'deactivated', 'deleted'],
  inactive: ['active', 'blocked', 'deleted'],
  suspended: ['active', 'blocked', 'deleted'],
  deactivated: ['active', 'deleted'],
  blocked: ['deleted'],
  deleted: [],
};

export class UserStatusVO extends BaseStatusVO<UserStatusValue> {
  private constructor(value: UserStatusValue) {
    super(value);
  }

  static create(raw: string): UserStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidUserStatusError(String(raw), VALID_STATUSES);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new InvalidUserStatusError(normalized, VALID_STATUSES);
    }
    return new UserStatusVO(normalized as UserStatusValue);
  }

  static pending(): UserStatusVO { return new UserStatusVO('pending'); }
  static active(): UserStatusVO { return new UserStatusVO('active'); }
  static inactive(): UserStatusVO { return new UserStatusVO('inactive'); }
  static suspended(): UserStatusVO { return new UserStatusVO('suspended'); }
  static blocked(): UserStatusVO { return new UserStatusVO('blocked'); }
  static deleted(): UserStatusVO { return new UserStatusVO('deleted'); }
  static deactivated(): UserStatusVO { return new UserStatusVO('deactivated'); }
  static unverified(): UserStatusVO { return new UserStatusVO('unverified'); }

  static reconstitute(raw: string): UserStatusVO {
    return new UserStatusVO(raw as UserStatusValue);
  }

  isPending(): boolean { return this.value === 'pending'; }
  isActive(): boolean { return this.value === 'active'; }
  isInactive(): boolean { return this.value === 'inactive'; }
  isSuspended(): boolean { return this.value === 'suspended'; }
  isBlocked(): boolean { return this.value === 'blocked'; }
  isDeleted(): boolean { return this.value === 'deleted'; }
  isDeactivated(): boolean { return this.value === 'deactivated'; }
  isUnverified(): boolean { return this.value === 'unverified'; }

  isFinal(): boolean { return this.isDeleted(); }
  isUsable(): boolean { return this.isActive(); }
  canLogin(): boolean {
    return this.isActive();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as UserStatusValue);
  }
}
