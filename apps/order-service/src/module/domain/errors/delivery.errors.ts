/**
 * Delivery Domain Errors
 * @module order-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class DeliveryNotFoundError extends NotFoundError {
  constructor(deliveryId: string) {
    super('Delivery', deliveryId);
    this.name = 'DeliveryNotFoundError';
  }
}

export class DeliveryMethodNotFoundError extends NotFoundError {
  constructor(methodId: string) {
    super('DeliveryMethod', methodId);
    this.name = 'DeliveryMethodNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidDeliveryStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid delivery status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidDeliveryStatusError';
  }
}

export class InvalidDeliveryTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid delivery type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidDeliveryTypeError';
  }
}

// ─── Business Rule (400) ───────────────────
export class InvalidDeliveryStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, deliveryId?: string) {
    super(
      `Cannot transition delivery status from "${from}" to "${to}"`,
      'INVALID_DELIVERY_STATUS_TRANSITION',
      { from, to, deliveryId },
    );
    this.name = 'InvalidDeliveryStatusTransitionError';
  }
}

export class DeliveryCannotBeRescheduledError extends BusinessRuleError {
  constructor(deliveryId: string, status: string) {
    super(
      `Delivery "${deliveryId}" cannot be rescheduled in status "${status}"`,
      'DELIVERY_CANNOT_BE_RESCHEDULED',
      { deliveryId, status },
    );
    this.name = 'DeliveryCannotBeRescheduledError';
  }
}

export class DeliveryCannotBeRetriedError extends BusinessRuleError {
  constructor(deliveryId: string, status: string, attempts: number) {
    super(
      `Delivery "${deliveryId}" cannot be retried (status: ${status}, attempts: ${attempts})`,
      'DELIVERY_CANNOT_BE_RETRIED',
      { deliveryId, status, attempts },
    );
    this.name = 'DeliveryCannotBeRetriedError';
  }
}

export class DeliveryMethodInactiveError extends BusinessRuleError {
  constructor(methodId: string) {
    super(`Delivery method "${methodId}" is not active`, 'DELIVERY_METHOD_INACTIVE', {
      methodId,
    });
    this.name = 'DeliveryMethodInactiveError';
  }
}
