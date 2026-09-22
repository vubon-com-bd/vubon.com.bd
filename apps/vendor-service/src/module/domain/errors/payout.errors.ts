import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class PayoutNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VENDOR_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(payoutId: string) {
    super(`Payout not found: ${payoutId}`, { payoutId });
  }
}

export class PayoutLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(amount: string, limit: string) {
    super(`Payout limit exceeded: ${amount} > ${limit}`, { amount, limit });
  }
}

export class PayoutNotAllowedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(reason: string) {
    super(`Payout not allowed: ${reason}`, { reason });
  }
}

export class InvalidPayoutIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid payout id: ${value}`, { value });
  }
}

export class InvalidPayoutAmountError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid payout amount: ${value}`, { value });
  }
}

export class InvalidPayoutStatusError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid payout status: ${value}`, { value });
  }
}
