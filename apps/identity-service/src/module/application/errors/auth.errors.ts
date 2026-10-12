import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class LoginFailedError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_UNAUTHORIZED;
  readonly httpStatus = 401;
  constructor(reason?: string) {
    super(`Login failed${reason ? `: ${reason}` : ''}`, { reason });
    this.name = 'LoginFailedError';
  }
}

export class RegistrationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 422;
  constructor(reason: string) {
    super(`Registration failed: ${reason}`, { reason });
    this.name = 'RegistrationFailedError';
  }
}
