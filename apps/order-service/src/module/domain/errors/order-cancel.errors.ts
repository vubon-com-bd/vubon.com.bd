/**
 * Order cancel domain errors
 * @module order-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class CancelNotFoundError extends NotFoundError {
  constructor(cancelId: string) {
    super('OrderCancel', cancelId);
    this.name = 'CancelNotFoundError';
  }
}

export class CancelWindowExpiredError extends BusinessRuleError {
  constructor(orderId: string) {
    super(
      `Cancel window expired for order "${orderId}"`,
      'CANCEL_WINDOW_EXPIRED',
      { orderId },
    );
    this.name = 'CancelWindowExpiredError';
  }
}

export class CannotCancelError extends BusinessRuleError {
  constructor(orderId: string, reason: string) {
    super(
      `Cannot cancel order "${orderId}": ${reason}`,
      'CANNOT_CANCEL',
      { orderId, reason },
    );
    this.name = 'CannotCancelError';
  }
}

export class CancelAlreadyProcessedError extends BusinessRuleError {
  constructor(cancelId: string, status: string) {
    super(
      `Cancel "${cancelId}" already processed with status "${status}"`,
      'CANCEL_ALREADY_PROCESSED',
      { cancelId, status },
    );
    this.name = 'CancelAlreadyProcessedError';
  }
}

export class InvalidCancelStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid cancel status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidCancelStatusError';
  }
}

export class InvalidCancelReasonError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid cancel reason "${value}". Allowed: ${allowed.join(', ')}`, 'reason');
    this.name = 'InvalidCancelReasonError';
  }
}
