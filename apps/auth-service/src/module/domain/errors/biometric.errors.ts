/**
 * Biometric Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class BiometricFailedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_BIOMETRIC_FAILED;
  readonly httpStatus = 401;

  constructor(reason: string) {
    super(`Biometric verification failed: ${reason}`, { reason });
  }
}

export class BiometricNotEnrolledError extends DomainError {
  readonly code = ERROR_CODE.AUTH_BIOMETRIC_NOT_ENROLLED;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`Biometric not enrolled for user: ${userId}`, { userId });
  }
}
