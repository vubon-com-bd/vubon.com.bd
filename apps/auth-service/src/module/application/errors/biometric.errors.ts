import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class BiometricOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_BIOMETRIC_FAILED;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Biometric operation failed: ${reason}`, { reason });
  }
}
