/**
 * UserRoleVO — Role name wrapper
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Must be one of the platform ROLE constants
 * - Lowercase, no spaces
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ROLE } from '@vubon/shared-constants/common';
import { InvalidRoleError } from '../../errors/permission.errors';

type RoleValue = (typeof ROLE)[keyof typeof ROLE];

const VALID_ROLES: ReadonlySet<string> = new Set<string>(Object.values(ROLE));

export class UserRoleVO extends BaseTypeVO<RoleValue> {
  private constructor(value: RoleValue) {
    super(value);
  }

  static of(raw: string): UserRoleVO {
    if (typeof raw !== 'string') {
      throw new InvalidRoleError(String(raw));
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_ROLES.has(normalized)) {
      throw new InvalidRoleError(raw);
    }
    return new UserRoleVO(normalized as RoleValue);
  }

  static superAdmin(): UserRoleVO {
    return new UserRoleVO(ROLE.SUPER_ADMIN as RoleValue);
  }

  static customer(): UserRoleVO {
    return new UserRoleVO(ROLE.CUSTOMER as RoleValue);
  }

  isSuperAdmin(): boolean {
    return this.value === ROLE.SUPER_ADMIN;
  }

  isAdminLevel(): boolean {
    return this.value === ROLE.SUPER_ADMIN || this.value === ROLE.ADMIN;
  }
}
