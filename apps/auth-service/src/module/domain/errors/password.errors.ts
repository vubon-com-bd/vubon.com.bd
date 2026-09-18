import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class InvalidPasswordError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_CREDENTIALS;
  readonly httpStatus = 401;

  constructor() {
    super('Invalid password provided');
  }
}

export class WeakPasswordError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_WEAK_PASSWORD;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Weak password: ${reason}`, { reason });
  }
}
