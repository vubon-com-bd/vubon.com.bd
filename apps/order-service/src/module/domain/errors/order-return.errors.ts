/**
 * Order return domain errors
 * @module order-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class ReturnNotFoundError extends NotFoundError {
  constructor(returnId: string) {
    super('OrderReturn', returnId);
    this.name = 'ReturnNotFoundError';
  }
}

export class ReturnWindowExpiredError extends BusinessRuleError {
  constructor(orderId: string) {
    super(
      `Return window expired for order "${orderId}"`,
      'RETURN_WINDOW_EXPIRED',
      { orderId },
    );
    this.name = 'ReturnWindowExpiredError';
  }
}

export class CannotReturnError extends BusinessRuleError {
  constructor(orderId: string, reason: string) {
    super(
      `Cannot return order "${orderId}": ${reason}`,
      'CANNOT_RETURN',
      { orderId, reason },
    );
    this.name = 'CannotReturnError';
  }
}

export class ReturnAlreadyProcessedError extends BusinessRuleError {
  constructor(returnId: string, status: string) {
    super(
      `Return "${returnId}" already processed with status "${status}"`,
      'RETURN_ALREADY_PROCESSED',
      { returnId, status },
    );
    this.name = 'ReturnAlreadyProcessedError';
  }
}

export class InvalidReturnStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid return status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidReturnStatusError';
  }
}

export class InvalidReturnReasonError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid return reason "${value}". Allowed: ${allowed.join(', ')}`, 'reason');
    this.name = 'InvalidReturnReasonError';
  }
}
