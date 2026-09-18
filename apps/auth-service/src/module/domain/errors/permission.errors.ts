import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class PermissionDeniedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(action: string, resource: string) {
    super(`Permission denied: ${action} on ${resource}`, { action, resource });
  }
}

export class InvalidRoleError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_ROLE;
  readonly httpStatus = 400;

  constructor(role: string) {
    super(`Invalid role: ${role}`, { role });
  }
}
