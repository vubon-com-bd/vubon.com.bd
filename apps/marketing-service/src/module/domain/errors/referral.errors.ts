import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ReferralNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.REFERRAL_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(referralId: string) {
    super(`Referral not found: ${referralId}`, { referralId });
  }
}

export class ReferralExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.REFERRAL_EXPIRED;
  readonly httpStatus = 410;

  constructor(referralId: string) {
    super(`Referral expired: ${referralId}`, { referralId });
  }
}
