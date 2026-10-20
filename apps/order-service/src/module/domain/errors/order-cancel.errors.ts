/**
 * Order Cancel Domain Errors
 * @module order-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class OrderCancelNotFoundError extends NotFoundError {
  constructor(cancelId: string) {
    super('OrderCancel', cancelId);
    this.name = 'OrderCancelNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidOrderCancelStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order cancel status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidOrderCancelStatusError';
  }
}

export class InvalidOrderCancelReasonError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order cancel reason "${value}". Allowed: ${allowed.join(', ')}`, 'reason');
    this.name = 'InvalidOrderCancelReasonError';
  }
}

// ─── Business Rule (400) ───────────────────
export class OrderCancelWindowExpiredError extends BusinessRuleError {
  constructor(orderId: string, windowHours: number, placedAt: string) {
    super(
      `Order "${orderId}" cancel window of ${windowHours}h expired (placed at ${placedAt})`,
      'ORDER_CANCEL_WINDOW_EXPIRED',
      { orderId, windowHours, placedAt },
    );
    this.name = 'OrderCancelWindowExpiredError';
  }
}

export class OrderCancelNotAllowedAfterShipmentError extends BusinessRuleError {
  constructor(orderId: string) {
    super(
      `Order "${orderId}" cannot be cancelled after shipment`,
      'ORDER_CANCEL_NOT_ALLOWED_AFTER_SHIPMENT',
      { orderId },
    );
    this.name = 'OrderCancelNotAllowedAfterShipmentError';
  }
}

export class OrderCancelAlreadyProcessedError extends BusinessRuleError {
  constructor(cancelId: string, status: string) {
    super(
      `Order cancel "${cancelId}" already processed in status "${status}"`,
      'ORDER_CANCEL_ALREADY_PROCESSED',
      { cancelId, status },
    );
    this.name = 'OrderCancelAlreadyProcessedError';
  }
}

export class InvalidOrderCancelStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, cancelId?: string) {
    super(
      `Cannot transition order cancel status from "${from}" to "${to}"`,
      'INVALID_ORDER_CANCEL_STATUS_TRANSITION',
      { from, to, cancelId },
    );
    this.name = 'InvalidOrderCancelStatusTransitionError';
  }
}
