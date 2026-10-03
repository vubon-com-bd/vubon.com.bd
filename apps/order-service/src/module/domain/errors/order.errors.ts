/**
 * Order domain errors
 * @module order-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class OrderNotFoundError extends NotFoundError {
  constructor(orderId: string) {
    super('Order', orderId);
    this.name = 'OrderNotFoundError';
  }
}

export class OrderAlreadyExistsError extends ConflictError {
  constructor(orderNumber: string) {
    super(`Order "${orderNumber}" already exists`, 'orderNumber');
    this.name = 'OrderAlreadyExistsError';
  }
}

export class InvalidOrderStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidOrderStatusError';
  }
}

export class InvalidOrderTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidOrderTypeError';
  }
}

export class InvalidOrderPriorityError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid order priority "${value}". Allowed: ${allowed.join(', ')}`, 'priority');
    this.name = 'InvalidOrderPriorityError';
  }
}

export class InvalidOrderNumberError extends ValidationError {
  constructor(value: string) {
    super(`Invalid order number format: "${value}"`, 'orderNumber');
    this.name = 'InvalidOrderNumberError';
  }
}

export class InvalidStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition order status from "${from}" to "${to}"`,
      'INVALID_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidStatusTransitionError';
  }
}

export class OrderTotalMismatchError extends BusinessRuleError {
  constructor(expected: number, actual: number) {
    super(
      `Order total mismatch: expected ${expected}, actual ${actual}`,
      'ORDER_TOTAL_MISMATCH',
      { expected, actual },
    );
    this.name = 'OrderTotalMismatchError';
  }
}

export class OrderCannotBeModifiedError extends BusinessRuleError {
  constructor(orderId: string, status: string) {
    super(
      `Order "${orderId}" cannot be modified in status "${status}"`,
      'ORDER_NOT_MODIFIABLE',
      { orderId, status },
    );
    this.name = 'OrderCannotBeModifiedError';
  }
}
