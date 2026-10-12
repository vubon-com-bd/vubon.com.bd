/**
 * Fulfillment domain errors
 * @module logistics-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { FULFILLMENT_STATUS, FULFILLMENT_TYPE, FULFILLMENT_PRIORITY, FULFILLMENT } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(FULFILLMENT_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(FULFILLMENT_TYPE) as readonly string[];
const ALLOWED_PRIORITIES = Object.values(FULFILLMENT_PRIORITY) as readonly string[];

export class FulfillmentNotFoundError extends NotFoundError {
  constructor(fulfillmentId: string) {
    super('Fulfillment', fulfillmentId);
    this.name = 'FulfillmentNotFoundError';
  }
}

export class InvalidFulfillmentStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid fulfillment status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidFulfillmentStatusError';
  }
}

export class InvalidFulfillmentTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid fulfillment type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidFulfillmentTypeError';
  }
}

export class InvalidFulfillmentPriorityError extends ValidationError {
  constructor(value: string) {
    super(`Invalid fulfillment priority "${value}". Allowed: ${ALLOWED_PRIORITIES.join(', ')}`, 'priority');
    this.name = 'InvalidFulfillmentPriorityError';
  }
}

export class InvalidFulfillmentStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition fulfillment status from "${from}" to "${to}"`,
      'INVALID_FULFILLMENT_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidFulfillmentStatusTransitionError';
  }
}

export class FulfillmentItemLimitExceededError extends BusinessRuleError {
  constructor(count: number) {
    super(
      `Fulfillment item count ${count} exceeds maximum ${FULFILLMENT.MAX_ITEMS_PER_FULFILLMENT}`,
      'FULFILLMENT_ITEM_LIMIT_EXCEEDED',
      { count, max: FULFILLMENT.MAX_ITEMS_PER_FULFILLMENT },
    );
    this.name = 'FulfillmentItemLimitExceededError';
  }
}

export class FulfillmentSlaBreachedError extends BusinessRuleError {
  constructor(fulfillmentId: string, dueAt: string) {
    super(
      `Fulfillment "${fulfillmentId}" SLA breached (due ${dueAt})`,
      'FULFILLMENT_SLA_BREACHED',
      { fulfillmentId, dueAt },
    );
    this.name = 'FulfillmentSlaBreachedError';
  }
}

export class FulfillmentCannotBeModifiedError extends BusinessRuleError {
  constructor(fulfillmentId: string, status: string) {
    super(
      `Fulfillment "${fulfillmentId}" cannot be modified in status "${status}"`,
      'FULFILLMENT_CANNOT_BE_MODIFIED',
      { fulfillmentId, status },
    );
    this.name = 'FulfillmentCannotBeModifiedError';
  }
}
