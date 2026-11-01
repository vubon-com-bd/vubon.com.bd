/**
 * Checkout Application Errors
 * @module cart-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

// ─── Command (400) ────────────────────────
export class ProceedToCheckoutError extends CommandError {
  constructor(cartId: string, reason: string) {
    super(
      `Failed to proceed cart "${cartId}" to checkout: ${reason}`,
      'ProceedToCheckout',
      undefined,
    );
    void cartId;
    this.name = 'ProceedToCheckoutError';
  }
}

// ─── Business rules (400) ─────────────────
export class CartNotEligibleForCheckoutApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(cartId: string, reasons: readonly string[]) {
    super(
      `Cart "${cartId}" not eligible for checkout: ${reasons.join('; ')}`,
      { cartId, reasons },
    );
    this.name = 'CartNotEligibleForCheckoutApplicationError';
  }
}

export class CartEmptyApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.CART_EMPTY;
  readonly httpStatus = 400;

  constructor(cartId: string) {
    super(`Cart "${cartId}" is empty`, { cartId });
    this.name = 'CartEmptyApplicationError';
  }
}

export class CheckoutServiceUnavailableApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_UNAVAILABLE;
  readonly httpStatus = 503;

  constructor(service: string, reason?: string) {
    super(
      `Checkout service "${service}" unavailable${reason ? `: ${reason}` : ''}`,
      { service, reason },
    );
    this.name = 'CheckoutServiceUnavailableApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class CheckoutValidationApplicationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'CheckoutValidationApplicationError';
  }
}
