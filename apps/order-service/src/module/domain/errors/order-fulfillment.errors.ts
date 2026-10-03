/**
 * Order fulfillment domain errors
 * @module order-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class FulfillmentNotFoundError extends NotFoundError {
  constructor(fulfillmentId: string) {
    super('OrderFulfillment', fulfillmentId);
    this.name = 'FulfillmentNotFoundError';
  }
}

export class FulfillmentFailedError extends BusinessRuleError {
  constructor(orderId: string, reason: string) {
    super(
      `Fulfillment failed for order "${orderId}": ${reason}`,
      'FULFILLMENT_FAILED',
      { orderId, reason },
    );
    this.name = 'FulfillmentFailedError';
  }
}

export class AllocationFailedError extends BusinessRuleError {
  constructor(itemIds: readonly string[], reason: string) {
    super(
      `Allocation failed for items: ${reason}`,
      'ALLOCATION_FAILED',
      { itemIds, reason },
    );
    this.name = 'AllocationFailedError';
  }
}

export class InvalidFulfillmentStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid fulfillment status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidFulfillmentStatusError';
  }
}

export class InvalidFulfillmentTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid fulfillment type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidFulfillmentTypeError';
  }
}
