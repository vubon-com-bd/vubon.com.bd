/**
 * Subscription Application Errors
 * @module payment-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class SubscriptionNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(subscriptionId: string) {
    super('Subscription', subscriptionId);
    this.name = 'SubscriptionNotFoundApplicationError';
  }
}

export class SubscriptionCreationError extends CommandError {
  constructor(reason: string) {
    super(`Failed to create subscription: ${reason}`, 'CreateSubscription');
    this.name = 'SubscriptionCreationError';
  }
}

export class SubscriptionUpgradeError extends CommandError {
  constructor(subscriptionId: string, reason: string) {
    super(
      `Failed to upgrade subscription "${subscriptionId}": ${reason}`,
      'UpgradeSubscription',
    );
    this.name = 'SubscriptionUpgradeError';
  }
}

export class SubscriptionDowngradeError extends CommandError {
  constructor(subscriptionId: string, reason: string) {
    super(
      `Failed to downgrade subscription "${subscriptionId}": ${reason}`,
      'DowngradeSubscription',
    );
    this.name = 'SubscriptionDowngradeError';
  }
}

export class SubscriptionPauseError extends CommandError {
  constructor(subscriptionId: string, reason: string) {
    super(`Failed to pause subscription "${subscriptionId}": ${reason}`, 'PauseSubscription');
    this.name = 'SubscriptionPauseError';
  }
}

export class SubscriptionCancelError extends CommandError {
  constructor(subscriptionId: string, reason: string) {
    super(
      `Failed to cancel subscription "${subscriptionId}": ${reason}`,
      'CancelSubscription',
    );
    this.name = 'SubscriptionCancelError';
  }
}

export class SubscriptionAlreadyActiveError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(subscriptionId: string) {
    super(`Subscription "${subscriptionId}" is already active`, { subscriptionId });
    this.name = 'SubscriptionAlreadyActiveError';
  }
}
