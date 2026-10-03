/**
 * Permission / Role Application Errors
 * @module auth-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class PermissionDeniedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_PERMISSION_DENIED;
  readonly httpStatus = 403;

  constructor(permission: string) {
    super(`Permission denied: ${permission}`, { permission });
  }
}

export class InvalidRoleAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_ROLE;
  readonly httpStatus = 400;

  constructor(role: string) {
    super(`Invalid role: ${role}`, { role });
  }
}

export class RoleNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_ROLE_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(roleName: string) {
    super(`Role not found: ${roleName}`, { roleName });
  }
}

export class RoleAlreadyAssignedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_ROLE_ALREADY_ASSIGNED;
  readonly httpStatus = 409;

  constructor(userId: string, role: string) {
    super(`Role ${role} already assigned to user ${userId}`, { userId, role });
  }
}
