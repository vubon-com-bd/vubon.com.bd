import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class PermissionDeniedError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;
  constructor(permission: string, userId?: string) {
    super(`Permission denied: ${permission}`, { permission, userId });
    this.name = 'PermissionDeniedError';
  }
}
