import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class SubscriptionOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SUBSCRIPTION_OPERATION_FAILED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Subscription operation failed: ${reason}`, { reason });
  }
}

export class SubscriptionNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SUBSCRIPTION_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(subscriptionId: string) {
    super(`Subscription not found: ${subscriptionId}`, { subscriptionId });
  }
}
