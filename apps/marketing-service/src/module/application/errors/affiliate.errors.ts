import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class AffiliateNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AFFILIATE_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(affiliateId: string) {
    super(`Affiliate not found: ${affiliateId}`, { affiliateId });
  }
}

export class AffiliatePayoutAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AFFILIATE_PAYOUT_ERROR;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Affiliate payout error: ${reason}`, { reason });
  }
}
