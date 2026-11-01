/**
 * Order Domain Errors
 * @module order-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class OrderNotFoundError extends NotFoundError {
  constructor(orderId: string) {
    super('Order', orderId);
    this.name = 'OrderNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class OrderAlreadyCancelledError extends ConflictError {
  constructor(orderId: string) {
    super(`Order "${orderId}" is already cancelled`, 'orderId');
    this.name = 'OrderAlreadyCancelledError';
  }
}

export class OrderNumberAlreadyExistsError extends ConflictError {
  constructor(orderNumber: string) {
    super(`Order number "${orderNumber}" already exists`, 'orderNumber');
    this.name = 'OrderNumberAlreadyExistsError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidOrderStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidOrderStatusError';
  }
}

export class InvalidOrderPriorityError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order priority "${value}". Allowed: ${allowed.join(', ')}`, 'priority');
    this.name = 'InvalidOrderPriorityError';
  }
}

export class OrderItemLimitExceededError extends ValidationError {
  constructor(count: number, max: number) {
    super(`Order items exceed limit: ${count} > ${max}`, 'items');
    this.name = 'OrderItemLimitExceededError';
  }
}

export class OrderAmountMismatchError extends ValidationError {
  constructor(expected: number, actual: number, currency: string) {
    super(
      `Order amount mismatch: expected ${expected}, actual ${actual} ${currency}`,
      'amount',
    );
    this.name = 'OrderAmountMismatchError';
  }
}

export class EmptyOrderError extends ValidationError {
  constructor() {
    super('Order must contain at least one item', 'items');
    this.name = 'EmptyOrderError';
  }
}

// ─── Business Rule (400) ───────────────────
export class InvalidOrderStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, orderId?: string) {
    super(
      `Cannot transition order status from "${from}" to "${to}"`,
      'INVALID_ORDER_STATUS_TRANSITION',
      { from, to, orderId },
    );
    this.name = 'InvalidOrderStatusTransitionError';
  }
}

export class OrderCannotBeCancelledError extends BusinessRuleError {
  constructor(orderId: string, status: string) {
    super(
      `Order "${orderId}" cannot be cancelled in status "${status}"`,
      'ORDER_CANNOT_BE_CANCELLED',
      { orderId, status },
    );
    this.name = 'OrderCannotBeCancelledError';
  }
}

export class OrderCannotBeReturnedError extends BusinessRuleError {
  constructor(orderId: string, status: string) {
    super(
      `Order "${orderId}" cannot be returned in status "${status}"`,
      'ORDER_CANNOT_BE_RETURNED',
      { orderId, status },
    );
    this.name = 'OrderCannotBeReturnedError';
  }
}

export class OrderCannotBeModifiedError extends BusinessRuleError {
  constructor(orderId: string, status: string) {
    super(
      `Order "${orderId}" cannot be modified in status "${status}"`,
      'ORDER_CANNOT_BE_MODIFIED',
      { orderId, status },
    );
    this.name = 'OrderCannotBeModifiedError';
  }
}

export class OrderExpiredError extends BusinessRuleError {
  constructor(orderId: string, expiredAt: string) {
    super(`Order "${orderId}" expired at ${expiredAt}`, 'ORDER_EXPIRED', {
      orderId,
      expiredAt,
    });
    this.name = 'OrderExpiredError';
  }
}

export class InvalidOrderTotalError extends BusinessRuleError {
  constructor(reason: string, context?: Readonly<Record<string, unknown>>) {
    super(`Invalid order total: ${reason}`, 'INVALID_ORDER_TOTAL', context);
    this.name = 'InvalidOrderTotalError';
  }
}
