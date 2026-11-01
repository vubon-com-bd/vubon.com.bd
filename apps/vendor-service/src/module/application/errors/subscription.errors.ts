/**
 * Vendor Subscription Application Errors
 * @module vendor-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';
import { QueryError } from '@vubon/shared-kernel/application/errors/query.error';

// ─── Not Found (404) ──────────────────────
export class SubscriptionNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(subscriptionId: string) {
    super('VendorSubscription', subscriptionId);
    this.name = 'SubscriptionNotFoundApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class SubscriptionValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'SubscriptionValidationError';
  }
}

// ─── Command errors (400) ─────────────────
export class SubscriptionCreationError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Subscription creation for vendor "${vendorId}" failed: ${reason}`, 'CreateSubscription');
    this.name = 'SubscriptionCreationError';
  }
}

export class SubscriptionUpgradeError extends CommandError {
  constructor(subscriptionId: string, reason: string) {
    super(`Subscription "${subscriptionId}" upgrade failed: ${reason}`, 'UpgradeSubscription');
    this.name = 'SubscriptionUpgradeError';
  }
}

export class SubscriptionDowngradeError extends CommandError {
  constructor(subscriptionId: string, reason: string) {
    super(`Subscription "${subscriptionId}" downgrade failed: ${reason}`, 'DowngradeSubscription');
    this.name = 'SubscriptionDowngradeError';
  }
}

export class SubscriptionCancellationError extends CommandError {
  constructor(subscriptionId: string, reason: string) {
    super(`Subscription "${subscriptionId}" cancellation failed: ${reason}`, 'CancelSubscription');
    this.name = 'SubscriptionCancellationError';
  }
}

// ─── Query errors (400) ───────────────────
export class SubscriptionQueryError extends QueryError {
  constructor(reason: string) {
    super(`Subscription query failed: ${reason}`, 'SubscriptionQuery');
    this.name = 'SubscriptionQueryError';
  }
}

// ─── Conflict (409) ───────────────────────
export class SubscriptionAlreadyActiveApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(vendorId: string) {
    super(`Vendor "${vendorId}" already has an active subscription`, { vendorId });
    this.name = 'SubscriptionAlreadyActiveApplicationError';
  }
}

export class SubscriptionDowngradeNotAllowedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(vendorId: string, currentPlan: string, targetPlan: string) {
    super(
      `Cannot downgrade vendor "${vendorId}" from "${currentPlan}" to "${targetPlan}"`,
      { vendorId, currentPlan, targetPlan },
    );
    this.name = 'SubscriptionDowngradeNotAllowedApplicationError';
  }
}
