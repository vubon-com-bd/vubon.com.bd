/**
 * Subscription Domain Errors
 * @module payment-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class SubscriptionNotFoundError extends NotFoundError {
  constructor(subscriptionId: string) {
    super('Subscription', subscriptionId);
    this.name = 'SubscriptionNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidSubscriptionStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid subscription status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidSubscriptionStatusError';
  }
}

export class InvalidSubscriptionPlanError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid subscription plan "${value}". Allowed: ${allowed.join(', ')}`, 'plan');
    this.name = 'InvalidSubscriptionPlanError';
  }
}

// ─── Business Rule (400) ───────────────────
export class SubscriptionExpiredError extends BusinessRuleError {
  constructor(subscriptionId: string, expiredAt: string) {
    super(
      `Subscription "${subscriptionId}" expired at ${expiredAt}`,
      'SUBSCRIPTION_EXPIRED',
      { subscriptionId, expiredAt },
    );
    this.name = 'SubscriptionExpiredError';
  }
}

export class SubscriptionAlreadyCancelledError extends BusinessRuleError {
  constructor(subscriptionId: string) {
    super(
      `Subscription "${subscriptionId}" is already cancelled`,
      'SUBSCRIPTION_ALREADY_CANCELLED',
      { subscriptionId },
    );
    this.name = 'SubscriptionAlreadyCancelledError';
  }
}

export class InvalidSubscriptionStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, subscriptionId?: string) {
    super(
      `Cannot transition subscription status from "${from}" to "${to}"`,
      'INVALID_SUBSCRIPTION_STATUS_TRANSITION',
      { from, to, subscriptionId },
    );
    this.name = 'InvalidSubscriptionStatusTransitionError';
  }
}
