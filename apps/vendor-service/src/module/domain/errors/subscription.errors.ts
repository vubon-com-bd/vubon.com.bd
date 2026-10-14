/**
 * Vendor Subscription Errors
 * @module vendor-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VendorSubscriptionNotFoundError extends NotFoundError {
  constructor(subscriptionId: string) {
    super('VendorSubscription', subscriptionId);
    this.name = 'VendorSubscriptionNotFoundError';
  }
}

export class InvalidSubscriptionPlanError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid subscription plan "${value}". Allowed: ${allowed.join(', ')}`, 'plan');
    this.name = 'InvalidSubscriptionPlanError';
  }
}

export class InvalidSubscriptionStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid subscription status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidSubscriptionStatusError';
  }
}

export class SubscriptionAlreadyActiveError extends ConflictError {
  constructor(vendorId: string) {
    super(`Vendor "${vendorId}" already has an active subscription`, 'vendorId');
    this.name = 'SubscriptionAlreadyActiveError';
  }
}

export class SubscriptionTrialExpiredError extends BusinessRuleError {
  constructor(subscriptionId: string, expiredAt: string) {
    super(
      `Subscription "${subscriptionId}" trial expired at ${expiredAt}`,
      'SUBSCRIPTION_TRIAL_EXPIRED',
      { subscriptionId, expiredAt },
    );
    this.name = 'SubscriptionTrialExpiredError';
  }
}

export class SubscriptionPlanDowngradeNotAllowedError extends BusinessRuleError {
  constructor(vendorId: string, currentPlan: string, targetPlan: string) {
    super(
      `Cannot downgrade vendor "${vendorId}" from "${currentPlan}" to "${targetPlan}"`,
      'SUBSCRIPTION_DOWNGRADE_NOT_ALLOWED',
      { vendorId, currentPlan, targetPlan },
    );
    this.name = 'SubscriptionPlanDowngradeNotAllowedError';
  }
}
