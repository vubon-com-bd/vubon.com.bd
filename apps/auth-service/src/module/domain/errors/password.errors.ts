/**
 * Password Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class InvalidPasswordError extends DomainError {
  readonly code = ERROR_CODE.AUTH_INVALID_CREDENTIALS;
  readonly httpStatus = 401;

  constructor(reason: string) {
    super(`Invalid password: ${reason}`, { reason });
  }
}

export class WeakPasswordError extends DomainError {
  readonly code = ERROR_CODE.AUTH_WEAK_PASSWORD;
  readonly httpStatus = 422;

  constructor(reasons: readonly string[]) {
    super(
      `Password too weak. Requirements missing: ${reasons.join(', ')}`,
      { missing: reasons },
    );
  }
}

export class PasswordMismatchError extends DomainError {
  readonly code = ERROR_CODE.AUTH_PASSWORD_MISMATCH;
  readonly httpStatus = 422;

  constructor() {
    super('Password confirmation does not match');
  }
}
