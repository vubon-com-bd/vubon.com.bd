import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class BiometricFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_BIOMETRIC_FAILED;
  readonly httpStatus = 401;

  constructor(reason: string) {
    super(`Biometric failed: ${reason}`, { reason });
  }
}
