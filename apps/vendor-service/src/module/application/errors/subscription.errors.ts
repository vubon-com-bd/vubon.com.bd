/**
 * Application-level subscription errors
 * @module vendor-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class SubscriptionNotFoundError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_SUBSCRIPTION_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(vendorId: string) {
    super(`Subscription not found for vendor "${vendorId}"`, { vendorId });
    this.name = 'SubscriptionNotFoundError';
  }
}

export class SubscriptionAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_INVALID_STATE;
  readonly httpStatus = 409;
  constructor(vendorId: string) {
    super(
      `Active subscription already exists for vendor "${vendorId}"`,
      { vendorId },
    );
    this.name = 'SubscriptionAlreadyExistsError';
  }
}

export class SubscriptionPlanNotChangeableError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_INVALID_STATE;
  readonly httpStatus = 400;
  constructor(status: string, from: string, to: string) {
    super(
      `Cannot change plan from "${from}" to "${to}" in status "${status}"`,
      { status, from, to },
    );
    this.name = 'SubscriptionPlanNotChangeableError';
  }
}

export class ProductLimitExceededError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_INVALID_STATE;
  readonly httpStatus = 422;
  constructor(current: number, limit: number | null) {
    super(
      `Product limit exceeded (${current}/${limit ?? 'unlimited'})`,
      { current, limit },
    );
    this.name = 'ProductLimitExceededError';
  }
}

export class SubscriptionExpiredError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_SUBSCRIPTION_EXPIRED;
  readonly httpStatus = 410;
  constructor(vendorId: string) {
    super(`Subscription expired for vendor "${vendorId}"`, { vendorId });
    this.name = 'SubscriptionExpiredError';
  }
}
