/**
 * Order Fulfillment Domain Errors
 * @module order-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class FulfillmentNotFoundError extends NotFoundError {
  constructor(fulfillmentId: string) {
    super('OrderFulfillment', fulfillmentId);
    this.name = 'FulfillmentNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
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

// ─── Business Rule (400) ───────────────────
export class FulfillmentItemMismatchError extends BusinessRuleError {
  constructor(fulfillmentId: string, expected: readonly string[], actual: readonly string[]) {
    super(
      `Fulfillment "${fulfillmentId}" item mismatch: expected [${expected.join(', ')}], actual [${actual.join(', ')}]`,
      'FULFILLMENT_ITEM_MISMATCH',
      { fulfillmentId, expected, actual },
    );
    this.name = 'FulfillmentItemMismatchError';
  }
}

export class FulfillmentAlreadyCompleteError extends BusinessRuleError {
  constructor(fulfillmentId: string) {
    super(
      `Fulfillment "${fulfillmentId}" is already complete`,
      'FULFILLMENT_ALREADY_COMPLETE',
      { fulfillmentId },
    );
    this.name = 'FulfillmentAlreadyCompleteError';
  }
}

export class InvalidFulfillmentStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, fulfillmentId?: string) {
    super(
      `Cannot transition fulfillment status from "${from}" to "${to}"`,
      'INVALID_FULFILLMENT_STATUS_TRANSITION',
      { from, to, fulfillmentId },
    );
    this.name = 'InvalidFulfillmentStatusTransitionError';
  }
}
