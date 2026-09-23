import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class AffiliateNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AFFILIATE_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(affiliateId: string) {
    super(`Affiliate not found: ${affiliateId}`, { affiliateId });
  }
}

export class AffiliatePayoutError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AFFILIATE_PAYOUT_ERROR;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Affiliate payout error: ${reason}`, { reason });
  }
}
