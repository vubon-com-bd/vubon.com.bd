import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class VerificationExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_VERIFICATION_EXPIRED;
  readonly httpStatus = 410;

  constructor(code: string) {
    super(`Verification expired: ${code}`, { code });
  }
}
