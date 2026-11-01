/**
 * UserRole Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { USER_ROLE } from '@vubon/shared-constants/user';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_ROLES: readonly string[] = Object.values(USER_ROLE);

export class UserRoleVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserRoleVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserRole cannot be empty', 'role');
    }
    const normalized = raw.trim().toLowerCase().replace(/\s+/g, '_');
    if (!VALID_ROLES.includes(normalized)) {
      throw new ValidationError(
        `Invalid UserRole "${normalized}". Allowed: ${VALID_ROLES.join(', ')}`,
        'role',
      );
    }
    return new UserRoleVO(normalized);
  }

  static superAdmin(): UserRoleVO { return new UserRoleVO(USER_ROLE.SUPER_ADMIN); }
  static admin(): UserRoleVO { return new UserRoleVO(USER_ROLE.ADMIN); }
  static moderator(): UserRoleVO { return new UserRoleVO(USER_ROLE.MODERATOR); }
  static vendor(): UserRoleVO { return new UserRoleVO(USER_ROLE.VENDOR); }
  static customer(): UserRoleVO { return new UserRoleVO(USER_ROLE.CUSTOMER); }
  static guest(): UserRoleVO { return new UserRoleVO(USER_ROLE.GUEST); }
  static supportAgent(): UserRoleVO { return new UserRoleVO(USER_ROLE.SUPPORT_AGENT); }
  static logisticsManager(): UserRoleVO { return new UserRoleVO(USER_ROLE.LOGISTICS_MANAGER); }

  static reconstitute(raw: string): UserRoleVO {
    return new UserRoleVO(raw);
  }

  isSuperAdmin(): boolean { return this.value === USER_ROLE.SUPER_ADMIN; }
  isAdmin(): boolean {
    return [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN, USER_ROLE.MODERATOR].includes(this.value as never);
  }
  isCustomer(): boolean { return this.value === USER_ROLE.CUSTOMER; }
  isVendor(): boolean { return this.value === USER_ROLE.VENDOR; }
  isSystemRole(): boolean {
    return [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN].includes(this.value as never);
  }
}
