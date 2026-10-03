/**
 * Checkout domain errors
 * @module order-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class CheckoutNotFoundError extends NotFoundError {
  constructor(checkoutId: string) {
    super('Checkout', checkoutId);
    this.name = 'CheckoutNotFoundError';
  }
}

export class CheckoutExpiredError extends BusinessRuleError {
  constructor(checkoutId: string) {
    super(
      `Checkout session "${checkoutId}" has expired`,
      'CHECKOUT_EXPIRED',
      { checkoutId },
    );
    this.name = 'CheckoutExpiredError';
  }
}

export class CheckoutIncompleteError extends BusinessRuleError {
  constructor(checkoutId: string, currentStep: string) {
    super(
      `Checkout "${checkoutId}" is incomplete at step "${currentStep}"`,
      'CHECKOUT_INCOMPLETE',
      { checkoutId, currentStep },
    );
    this.name = 'CheckoutIncompleteError';
  }
}

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

export class InvalidCheckoutTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid checkout type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidCheckoutTypeError';
  }
}
