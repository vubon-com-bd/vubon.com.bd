import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class MfaSetupFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_MFA_INVALID;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`MFA setup failed: ${reason}`, { reason });
  }
}

export class MfaVerificationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_MFA_INVALID;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`MFA verification failed: ${reason}`, { reason });
  }
}
