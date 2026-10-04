/**
 * Permission / Role Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class PermissionDeniedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_PERMISSION_DENIED;
  readonly httpStatus = 403;

  constructor(permission: string) {
    super(`Permission denied: ${permission}`, { permission });
  }
}

export class InvalidRoleError extends DomainError {
  readonly code = ERROR_CODE.AUTH_INVALID_ROLE;
  readonly httpStatus = 422;

  constructor(role: string) {
    super(`Invalid role: ${role}`, { role });
  }
}

export class RoleNotFoundError extends DomainError {
  readonly code = ERROR_CODE.AUTH_ROLE_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(roleName: string) {
    super(`Role not found: ${roleName}`, { roleName });
  }
}

export class RoleAlreadyAssignedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_ROLE_ALREADY_ASSIGNED;
  readonly httpStatus = 409;

  constructor(userId: string, role: string) {
    super(`Role ${role} already assigned to user ${userId}`, {
      userId,
      role,
    });
  }
}
