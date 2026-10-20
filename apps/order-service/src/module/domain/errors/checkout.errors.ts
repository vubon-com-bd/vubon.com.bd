/**
 * Checkout Domain Errors
 * @module order-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class CheckoutNotFoundError extends NotFoundError {
  constructor(checkoutId: string) {
    super('Checkout', checkoutId);
    this.name = 'CheckoutNotFoundError';
  }
}

export class CheckoutSessionNotFoundError extends NotFoundError {
  constructor(sessionId: string) {
    super('CheckoutSession', sessionId);
    this.name = 'CheckoutSessionNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidCheckoutStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid checkout status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidCheckoutStatusError';
  }
}

export class InvalidCheckoutStepError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid checkout step "${value}". Allowed: ${allowed.join(', ')}`, 'step');
    this.name = 'InvalidCheckoutStepError';
  }
}

// ─── Business Rule (400) ───────────────────
export class CheckoutExpiredError extends BusinessRuleError {
  constructor(checkoutId: string, expiredAt: string) {
    super(`Checkout "${checkoutId}" expired at ${expiredAt}`, 'CHECKOUT_EXPIRED', {
      checkoutId,
      expiredAt,
    });
    this.name = 'CheckoutExpiredError';
  }
}

export class CheckoutAlreadyCompletedError extends BusinessRuleError {
  constructor(checkoutId: string) {
    super(`Checkout "${checkoutId}" is already completed`, 'CHECKOUT_ALREADY_COMPLETED', {
      checkoutId,
    });
    this.name = 'CheckoutAlreadyCompletedError';
  }
}

export class InvalidCheckoutStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, checkoutId?: string) {
    super(
      `Cannot transition checkout status from "${from}" to "${to}"`,
      'INVALID_CHECKOUT_STATUS_TRANSITION',
      { from, to, checkoutId },
    );
    this.name = 'InvalidCheckoutStatusTransitionError';
  }
}

export class CheckoutStepOutOfOrderError extends BusinessRuleError {
  constructor(current: string, requested: string) {
    super(
      `Cannot move to checkout step "${requested}" from "${current}"`,
      'CHECKOUT_STEP_OUT_OF_ORDER',
      { current, requested },
    );
    this.name = 'CheckoutStepOutOfOrderError';
  }
}
