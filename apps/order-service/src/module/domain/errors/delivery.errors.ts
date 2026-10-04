/**
 * Delivery domain errors
 * @module order-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class DeliveryNotFoundError extends NotFoundError {
  constructor(deliveryId: string) {
    super('Delivery', deliveryId);
    this.name = 'DeliveryNotFoundError';
  }
}

export class DeliveryNotAvailableError extends BusinessRuleError {
  constructor(reason: string) {
    super(
      `Delivery not available: ${reason}`,
      'DELIVERY_NOT_AVAILABLE',
      { reason },
    );
    this.name = 'DeliveryNotAvailableError';
  }
}

export class InvalidDeliveryStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid delivery status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidDeliveryStatusError';
  }
}

export class InvalidDeliveryAddressError extends ValidationError {
  constructor(message: string) {
    super(message, 'address');
    this.name = 'InvalidDeliveryAddressError';
  }
}

export class DeliveryAlreadyExistsError extends BusinessRuleError {
  constructor(orderId: string) {
    super(
      `Delivery already exists for order "${orderId}"`,
      'DELIVERY_ALREADY_EXISTS',
      { orderId },
    );
    this.name = 'DeliveryAlreadyExistsError';
  }
}
