/**
 * Role & Permission Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class RoleNotFoundError extends NotFoundError {
  constructor(roleName: string) {
    super('Role', roleName);
    this.name = 'RoleNotFoundError';
  }
}

export class PermissionNotFoundError extends NotFoundError {
  constructor(permissionName: string) {
    super('Permission', permissionName);
    this.name = 'PermissionNotFoundError';
  }
}

// ─── Forbidden (403) ───────────────────────
export class PermissionDeniedError extends BusinessRuleError {
  constructor(permission: string, userId: string) {
    super(
      `Permission denied: "${permission}" for user "${userId}"`,
      'PERMISSION_DENIED',
      { permission, userId },
    );
    this.name = 'PermissionDeniedError';
  }
}

// ─── Conflict (409) ────────────────────────
export class RoleAlreadyAssignedError extends ConflictError {
  constructor(role: string, userId: string) {
    super(`Role "${role}" already assigned to user "${userId}"`, 'role');
    this.name = 'RoleAlreadyAssignedError';
  }
}

export class RoleAlreadyExistsError extends ConflictError {
  constructor(roleName: string) {
    super(`Role "${roleName}" already exists`, 'name');
    this.name = 'RoleAlreadyExistsError';
  }
}

// ─── Business Rule (400) ───────────────────
export class RoleNotAssignedError extends BusinessRuleError {
  constructor(role: string, userId: string) {
    super(
      `Role "${role}" not assigned to user "${userId}"`,
      'ROLE_NOT_ASSIGNED',
      { role, userId },
    );
    this.name = 'RoleNotAssignedError';
  }
}

export class SystemRoleCannotBeDeletedError extends BusinessRuleError {
  constructor(role: string) {
    super(
      `System role "${role}" cannot be deleted`,
      'SYSTEM_ROLE_CANNOT_BE_DELETED',
      { role },
    );
    this.name = 'SystemRoleCannotBeDeletedError';
  }
}

export class PermissionNotGrantedError extends BusinessRuleError {
  constructor(permission: string, role: string) {
    super(
      `Permission "${permission}" not granted to role "${role}"`,
      'PERMISSION_NOT_GRANTED',
      { permission, role },
    );
    this.name = 'PermissionNotGrantedError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidRoleNameError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid role name "${value}". Allowed: ${allowed.join(', ')}`, 'roleName');
    this.name = 'InvalidRoleNameError';
  }
}

export class InvalidPermissionNameError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid permission name "${value}". Allowed: ${allowed.join(', ')}`,
      'permissionName',
    );
    this.name = 'InvalidPermissionNameError';
  }
}
