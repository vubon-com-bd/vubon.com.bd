import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class LoginFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_CREDENTIALS;
  readonly httpStatus = 401;

  constructor(reason: string) {
    super(`Login failed: ${reason}`, { reason });
  }
}

export class RegisterFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(email: string) {
    super(`Registration failed: email ${email} already exists`, { email });
  }
}

export class AuthenticationRequiredError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_UNAUTHORIZED;
  readonly httpStatus = 401;

  constructor() {
    super('Authentication required');
  }
}
