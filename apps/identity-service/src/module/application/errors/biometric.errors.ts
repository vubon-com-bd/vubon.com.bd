import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class BiometricOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_UNAUTHORIZED;
  readonly httpStatus = 401;
  constructor(operation: string, reason: string) {
    super(`Biometric ${operation} failed: ${reason}`, { operation, reason });
    this.name = 'BiometricOperationFailedError';
  }
}
