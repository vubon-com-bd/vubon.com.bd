import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class SubscriptionNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VENDOR_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(subscriptionId: string) {
    super(`Subscription not found: ${subscriptionId}`, { subscriptionId });
  }
}

export class SubscriptionExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 410;

  constructor(subscriptionId: string) {
    super(`Subscription expired: ${subscriptionId}`, { subscriptionId });
  }
}

export class InvalidSubscriptionIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid subscription id: ${value}`, { value });
  }
}

export class InvalidSubscriptionPlanError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid subscription plan: ${value}`, { value });
  }
}
