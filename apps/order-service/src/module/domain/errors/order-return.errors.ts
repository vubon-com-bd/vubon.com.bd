/**
 * Order Return Domain Errors
 * @module order-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class OrderReturnNotFoundError extends NotFoundError {
  constructor(returnId: string) {
    super('OrderReturn', returnId);
    this.name = 'OrderReturnNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidOrderReturnStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order return status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidOrderReturnStatusError';
  }
}

export class InvalidOrderReturnReasonError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order return reason "${value}". Allowed: ${allowed.join(', ')}`, 'reason');
    this.name = 'InvalidOrderReturnReasonError';
  }
}

// ─── Business Rule (400) ───────────────────
export class OrderReturnWindowExpiredError extends BusinessRuleError {
  constructor(orderId: string, windowDays: number, deliveredAt: string) {
    super(
      `Order "${orderId}" return window of ${windowDays}d expired (delivered at ${deliveredAt})`,
      'ORDER_RETURN_WINDOW_EXPIRED',
      { orderId, windowDays, deliveredAt },
    );
    this.name = 'OrderReturnWindowExpiredError';
  }
}

export class OrderReturnItemNotReturnableError extends BusinessRuleError {
  constructor(itemId: string, reason: string) {
    super(
      `Order item "${itemId}" is not returnable: ${reason}`,
      'ORDER_RETURN_ITEM_NOT_RETURNABLE',
      { itemId, reason },
    );
    this.name = 'OrderReturnItemNotReturnableError';
  }
}

export class OrderReturnAlreadyProcessedError extends BusinessRuleError {
  constructor(returnId: string, status: string) {
    super(
      `Order return "${returnId}" already processed in status "${status}"`,
      'ORDER_RETURN_ALREADY_PROCESSED',
      { returnId, status },
    );
    this.name = 'OrderReturnAlreadyProcessedError';
  }
}

export class InvalidOrderReturnStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, returnId?: string) {
    super(
      `Cannot transition order return status from "${from}" to "${to}"`,
      'INVALID_ORDER_RETURN_STATUS_TRANSITION',
      { from, to, returnId },
    );
    this.name = 'InvalidOrderReturnStatusTransitionError';
  }
}
