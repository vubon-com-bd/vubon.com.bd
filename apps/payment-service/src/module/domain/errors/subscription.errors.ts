import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class SubscriptionNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(subscriptionId: string) {
    super(`Subscription not found: ${subscriptionId}`, { subscriptionId });
  }
}

export class SubscriptionExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 400;

  constructor(subscriptionId: string) {
    super(`Subscription expired: ${subscriptionId}`, { subscriptionId });
  }
}
