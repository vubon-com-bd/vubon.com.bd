/**
 * Fulfillment Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class FulfillmentNotFoundError extends NotFoundError {
  constructor(fulfillmentId: string) {
    super('Fulfillment', fulfillmentId);
    this.name = 'FulfillmentNotFoundError';
  }
}

export class FulfillmentAlreadyExistsError extends ConflictError {
  constructor(orderId: string) {
    super(`Fulfillment already exists for order "${orderId}"`, 'orderId');
    this.name = 'FulfillmentAlreadyExistsError';
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

export class InvalidFulfillmentPriorityError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid fulfillment priority "${value}". Allowed: ${allowed.join(', ')}`,
      'priority',
    );
    this.name = 'InvalidFulfillmentPriorityError';
  }
}

export class FulfillmentCannotBeStartedError extends BusinessRuleError {
  constructor(fulfillmentId: string, status: string) {
    super(
      `Fulfillment "${fulfillmentId}" cannot be started in status "${status}"`,
      'FULFILLMENT_CANNOT_BE_STARTED',
      { fulfillmentId, status },
    );
    this.name = 'FulfillmentCannotBeStartedError';
  }
}

export class FulfillmentCannotBeCancelledError extends BusinessRuleError {
  constructor(fulfillmentId: string, status: string) {
    super(
      `Fulfillment "${fulfillmentId}" cannot be cancelled in status "${status}"`,
      'FULFILLMENT_CANNOT_BE_CANCELLED',
      { fulfillmentId, status },
    );
    this.name = 'FulfillmentCannotBeCancelledError';
  }
}

export class FulfillmentSlaBreachedError extends BusinessRuleError {
  constructor(fulfillmentId: string, slaDueAt: string) {
    super(
      `Fulfillment "${fulfillmentId}" breached SLA at ${slaDueAt}`,
      'FULFILLMENT_SLA_BREACHED',
      { fulfillmentId, slaDueAt },
    );
    this.name = 'FulfillmentSlaBreachedError';
  }
}

export class FulfillmentAlreadyCompletedError extends BusinessRuleError {
  constructor(fulfillmentId: string, completedAt: string) {
    super(
      `Fulfillment "${fulfillmentId}" was already completed at ${completedAt}`,
      'FULFILLMENT_ALREADY_COMPLETED',
      { fulfillmentId, completedAt },
    );
    this.name = 'FulfillmentAlreadyCompletedError';
  }
}

export class FulfillmentNoItemsError extends BusinessRuleError {
  constructor(fulfillmentId: string) {
    super(
      `Fulfillment "${fulfillmentId}" must contain at least one item`,
      'FULFILLMENT_NO_ITEMS',
      { fulfillmentId },
    );
    this.name = 'FulfillmentNoItemsError';
  }
}
