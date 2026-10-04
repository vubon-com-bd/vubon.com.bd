/**
 * Biometric Application Errors
 * @module auth-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class BiometricFailedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_BIOMETRIC_FAILED;
  readonly httpStatus = 401;

  constructor(reason = 'Biometric verification failed') {
    super(reason);
  }
}

export class BiometricNotEnrolledAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_BIOMETRIC_NOT_ENROLLED;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`Biometric not enrolled for user: ${userId}`, { userId });
  }
}
