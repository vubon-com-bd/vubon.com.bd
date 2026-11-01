/**
 * RoleName Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_ROLE } from '@vubon/shared-constants/auth';
import { InvalidRoleNameError } from '../../errors/role-permission.errors.js';

const VALID_ROLES: readonly string[] = Object.values(AUTH_ROLE);

export class RoleNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RoleNameVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidRoleNameError(String(raw), VALID_ROLES);
    }
    const normalized = raw.trim().toLowerCase().replace(/\s+/g, '_');
    if (!VALID_ROLES.includes(normalized)) {
      throw new InvalidRoleNameError(normalized, VALID_ROLES);
    }
    return new RoleNameVO(normalized);
  }

  static reconstitute(raw: string): RoleNameVO {
    return new RoleNameVO(raw);
  }

  isAdmin(): boolean {
    return [AUTH_ROLE.SUPER_ADMIN, AUTH_ROLE.ADMIN, AUTH_ROLE.MODERATOR].includes(this.value as never);
  }
}
