/**
 * Delivery Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DeliveryNotFoundError extends NotFoundError {
  constructor(deliveryId: string) {
    super('Delivery', deliveryId);
    this.name = 'DeliveryNotFoundError';
  }
}

export class DeliveryAlreadyExistsError extends ConflictError {
  constructor(shipmentId: string) {
    super(`Delivery already exists for shipment "${shipmentId}"`, 'shipmentId');
    this.name = 'DeliveryAlreadyExistsError';
  }
}

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

export class DeliveryWindowExpiredError extends BusinessRuleError {
  constructor(deliveryId: string, windowEnd: string) {
    super(
      `Delivery window for "${deliveryId}" expired at ${windowEnd}`,
      'DELIVERY_WINDOW_EXPIRED',
      { deliveryId, windowEnd },
    );
    this.name = 'DeliveryWindowExpiredError';
  }
}

export class DeliveryAttemptExceededError extends BusinessRuleError {
  constructor(deliveryId: string, attempts: number, max: number) {
    super(
      `Delivery "${deliveryId}" exceeded max attempts (${attempts}/${max})`,
      'DELIVERY_ATTEMPTS_EXCEEDED',
      { deliveryId, attempts, max },
    );
    this.name = 'DeliveryAttemptExceededError';
  }
}

export class DeliveryCannotBeCompletedError extends BusinessRuleError {
  constructor(deliveryId: string, status: string) {
    super(
      `Delivery "${deliveryId}" cannot be completed in status "${status}"`,
      'DELIVERY_CANNOT_BE_COMPLETED',
      { deliveryId, status },
    );
    this.name = 'DeliveryCannotBeCompletedError';
  }
}

export class DeliveryCannotBeFailedError extends BusinessRuleError {
  constructor(deliveryId: string, status: string) {
    super(
      `Delivery "${deliveryId}" cannot be marked failed in status "${status}"`,
      'DELIVERY_CANNOT_BE_FAILED',
      { deliveryId, status },
    );
    this.name = 'DeliveryCannotBeFailedError';
  }
}

export class DeliveryAlreadyDeliveredError extends BusinessRuleError {
  constructor(deliveryId: string, deliveredAt: string) {
    super(
      `Delivery "${deliveryId}" was already delivered at ${deliveredAt}`,
      'DELIVERY_ALREADY_DELIVERED',
      { deliveryId, deliveredAt },
    );
    this.name = 'DeliveryAlreadyDeliveredError';
  }
}

export class ProofOfDeliveryRequiredError extends BusinessRuleError {
  constructor(deliveryId: string) {
    super(
      `Proof of delivery required for "${deliveryId}"`,
      'PROOF_OF_DELIVERY_REQUIRED',
      { deliveryId },
    );
    this.name = 'ProofOfDeliveryRequiredError';
  }
}

export class DeliveryDriverNotAssignedError extends BusinessRuleError {
  constructor(deliveryId: string) {
    super(
      `No driver assigned to delivery "${deliveryId}"`,
      'DELIVERY_DRIVER_NOT_ASSIGNED',
      { deliveryId },
    );
    this.name = 'DeliveryDriverNotAssignedError';
  }
}
