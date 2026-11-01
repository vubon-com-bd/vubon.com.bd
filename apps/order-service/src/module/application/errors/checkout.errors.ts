/**
 * Checkout Application Errors
 * @module order-service/application/errors
 */
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class CheckoutNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(checkoutId: string) {
    super('Checkout', checkoutId);
    this.name = 'CheckoutNotFoundApplicationError';
  }
}

export class CheckoutSessionNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(sessionId: string) {
    super('CheckoutSession', sessionId);
    this.name = 'CheckoutSessionNotFoundApplicationError';
  }
}

export class CheckoutExpiredApplicationError extends CommandError {
  constructor(checkoutId: string) {
    super(`Checkout ${checkoutId} has expired`, 'CheckoutExpired');
    this.name = 'CheckoutExpiredApplicationError';
  }
}

export class CheckoutAlreadyCompletedApplicationError extends CommandError {
  constructor(checkoutId: string) {
    super(`Checkout ${checkoutId} already completed`, 'CheckoutAlreadyCompleted');
    this.name = 'CheckoutAlreadyCompletedApplicationError';
  }
}

export class CheckoutStepError extends CommandError {
  constructor(checkoutId: string, current: string, requested: string) {
    super(
      `Cannot move checkout ${checkoutId} from "${current}" to "${requested}"`,
      'CheckoutStep',
    );
    this.name = 'CheckoutStepError';
  }
}
