import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class AuthorizationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(action: string, resource: string) {
    super(`Authorization failed: ${action} on ${resource}`, { action, resource });
  }
}

export class RoleOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_ROLE;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Role operation failed: ${reason}`, { reason });
  }
}
