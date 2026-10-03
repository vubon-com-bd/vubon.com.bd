/**
 * Checkout Application Errors
 */
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class CheckoutNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(checkoutId: string) {
    super('Checkout', checkoutId);
    this.name = 'CheckoutNotFoundApplicationError';
  }
}

export class CheckoutStartError extends CommandError {
  constructor(reason: string) {
    super(`Checkout start failed: ${reason}`, 'CheckoutStart');
    this.name = 'CheckoutStartError';
  }
}

export class CheckoutConfirmError extends CommandError {
  constructor(checkoutId: string, reason: string) {
    super(`Checkout confirm failed: ${reason}`, 'CheckoutConfirm');
    void checkoutId;
    this.name = 'CheckoutConfirmError';
  }
}

export class CheckoutAbandonError extends CommandError {
  constructor(checkoutId: string, reason: string) {
    super(`Checkout abandon failed: ${reason}`, 'CheckoutAbandon');
    void checkoutId;
    this.name = 'CheckoutAbandonError';
  }
}

export class CheckoutSessionNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(sessionId: string) {
    super('CheckoutSession', sessionId);
    this.name = 'CheckoutSessionNotFoundApplicationError';
  }
}

export class CheckoutSessionExpiredError extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_SESSION_EXPIRED;
  readonly httpStatus = 410;
  constructor(sessionId: string) {
    super(`Checkout session expired: ${sessionId}`, { sessionId });
    this.name = 'CheckoutSessionExpiredError';
  }
}
