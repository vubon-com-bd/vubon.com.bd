/**
 * UserStatusVO — User lifecycle status
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Only ACTIVE, INACTIVE, SUSPENDED, PENDING, DELETED allowed
 * - Immutable
 * - isActive(): only ACTIVE can login
 * - isLoginAllowed(): ACTIVE only
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { STATUS } from '@vubon/shared-constants/common';
import { InvalidUserStatusError } from '../../errors/user.errors';

type UserStatusValue =
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'pending'
  | 'deleted';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'active', 'inactive', 'suspended', 'pending', 'deleted',
]);

export class UserStatusVO extends BaseStatusVO<UserStatusValue> {
  private constructor(value: UserStatusValue) {
    super(value);
  }

  static of(raw: string): UserStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new InvalidUserStatusError(raw);
    }
    return new UserStatusVO(raw as UserStatusValue);
  }

  static active(): UserStatusVO {
    return new UserStatusVO('active');
  }

  static pending(): UserStatusVO {
    return new UserStatusVO('pending');
  }

  static suspended(): UserStatusVO {
    return new UserStatusVO('suspended');
  }

  override isActive(): boolean {
    return this.value === 'active';
  }

  isLoginAllowed(): boolean {
    return this.value === 'active';
  }

  isTerminal(): boolean {
    return this.value === 'deleted';
  }

  canTransitionTo(next: UserStatusVO): boolean {
    const transitions: Record<UserStatusValue, readonly UserStatusValue[]> = {
      pending: ['active', 'deleted'],
      active: ['inactive', 'suspended', 'deleted'],
      inactive: ['active', 'deleted'],
      suspended: ['active', 'deleted'],
      deleted: [],
    };
    return transitions[this.value].includes(next.value);
  }
}

export const USER_STATUS_VALUES = Object.freeze(Object.values(STATUS));
