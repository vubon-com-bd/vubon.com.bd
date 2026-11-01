/**
 * ReturnShipment Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ReturnShipmentNotFoundError extends NotFoundError {
  constructor(returnId: string) {
    super('ReturnShipment', returnId);
    this.name = 'ReturnShipmentNotFoundError';
  }
}

export class RmaNumberAlreadyExistsError extends ConflictError {
  constructor(rmaNumber: string) {
    super(`RMA "${rmaNumber}" already exists`, 'rmaNumber');
    this.name = 'RmaNumberAlreadyExistsError';
  }
}

export class InvalidReturnShipmentStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid return shipment status "${value}". Allowed: ${allowed.join(', ')}`,
      'status',
    );
    this.name = 'InvalidReturnShipmentStatusError';
  }
}

export class InvalidReturnShipmentTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid return shipment type "${value}". Allowed: ${allowed.join(', ')}`,
      'type',
    );
    this.name = 'InvalidReturnShipmentTypeError';
  }
}

export class InvalidReturnReasonError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid return reason "${value}". Allowed: ${allowed.join(', ')}`, 'reason');
    this.name = 'InvalidReturnReasonError';
  }
}

export class ReturnWindowExpiredError extends BusinessRuleError {
  constructor(returnId: string, windowEnd: string) {
    super(
      `Return window expired at ${windowEnd}`,
      'RETURN_WINDOW_EXPIRED',
      { returnId, windowEnd },
    );
    this.name = 'ReturnWindowExpiredError';
  }
}

export class ReturnCannotBeApprovedError extends BusinessRuleError {
  constructor(returnId: string, status: string) {
    super(
      `Return "${returnId}" cannot be approved in status "${status}"`,
      'RETURN_CANNOT_BE_APPROVED',
      { returnId, status },
    );
    this.name = 'ReturnCannotBeApprovedError';
  }
}

export class ReturnCannotBeCancelledError extends BusinessRuleError {
  constructor(returnId: string, status: string) {
    super(
      `Return "${returnId}" cannot be cancelled in status "${status}"`,
      'RETURN_CANNOT_BE_CANCELLED',
      { returnId, status },
    );
    this.name = 'ReturnCannotBeCancelledError';
  }
}

export class ReturnNoItemsError extends BusinessRuleError {
  constructor(returnId: string) {
    super(
      `Return "${returnId}" must contain at least one item`,
      'RETURN_NO_ITEMS',
      { returnId },
    );
    this.name = 'ReturnNoItemsError';
  }
}

export class ReturnAmountExceedsLimitError extends BusinessRuleError {
  constructor(amount: number, max: number, currency: string) {
    super(
      `Return amount ${amount} ${currency} exceeds limit ${max} ${currency}`,
      'RETURN_AMOUNT_EXCEEDS_LIMIT',
      { amount, max, currency },
    );
    this.name = 'ReturnAmountExceedsLimitError';
  }
}

export class ReturnPhotosRequiredError extends BusinessRuleError {
  constructor(returnId: string) {
    super(
      `Return "${returnId}" requires photos for this reason`,
      'RETURN_PHOTOS_REQUIRED',
      { returnId },
    );
    this.name = 'ReturnPhotosRequiredError';
  }
}
