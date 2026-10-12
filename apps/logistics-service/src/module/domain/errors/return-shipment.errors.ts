/**
 * Return shipment domain errors
 * @module logistics-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { RETURN_SHIPMENT_STATUS, RETURN_SHIPMENT_TYPE, RETURN_SHIPMENT_REASON, RETURN_SHIPMENT } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(RETURN_SHIPMENT_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(RETURN_SHIPMENT_TYPE) as readonly string[];
const ALLOWED_REASONS = Object.values(RETURN_SHIPMENT_REASON) as readonly string[];

export class ReturnShipmentNotFoundError extends NotFoundError {
  constructor(returnId: string) {
    super('ReturnShipment', returnId);
    this.name = 'ReturnShipmentNotFoundError';
  }
}

export class ReturnRmaAlreadyExistsError extends ConflictError {
  constructor(rmaNumber: string) {
    super(`Return shipment with RMA "${rmaNumber}" already exists`, 'rmaNumber');
    this.name = 'ReturnRmaAlreadyExistsError';
  }
}

export class InvalidReturnShipmentStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid return shipment status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidReturnShipmentStatusError';
  }
}

export class InvalidReturnShipmentTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid return shipment type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidReturnShipmentTypeError';
  }
}

export class InvalidReturnReasonError extends ValidationError {
  constructor(value: string) {
    super(`Invalid return reason "${value}". Allowed: ${ALLOWED_REASONS.join(', ')}`, 'reason');
    this.name = 'InvalidReturnReasonError';
  }
}

export class InvalidReturnStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition return shipment status from "${from}" to "${to}"`,
      'INVALID_RETURN_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidReturnStatusTransitionError';
  }
}

export class ReturnWindowExpiredError extends BusinessRuleError {
  constructor(orderId: string, days: number) {
    super(
      `Return window for order "${orderId}" expired (max ${days} days)`,
      'RETURN_WINDOW_EXPIRED',
      { orderId, days, max: RETURN_SHIPMENT.MAX_RETURN_DAYS },
    );
    this.name = 'ReturnWindowExpiredError';
  }
}

export class ReturnCannotBeApprovedError extends BusinessRuleError {
  constructor(returnId: string, status: string) {
    super(
      `Return shipment "${returnId}" cannot be approved from status "${status}"`,
      'RETURN_CANNOT_BE_APPROVED',
      { returnId, status },
    );
    this.name = 'ReturnCannotBeApprovedError';
  }
}

export class ReturnPhotoRequiredError extends BusinessRuleError {
  constructor(returnId: string) {
    super(
      `Return shipment "${returnId}" requires photos`,
      'RETURN_PHOTO_REQUIRED',
      { returnId, max: RETURN_SHIPMENT.MAX_PHOTOS },
    );
    this.name = 'ReturnPhotoRequiredError';
  }
}

export class ReturnValueExceededError extends BusinessRuleError {
  constructor(actual: number, max: number) {
    super(
      `Return value ${actual} exceeds maximum ${max}`,
      'RETURN_VALUE_EXCEEDED',
      { actual, max, limit: RETURN_SHIPMENT.MAX_RETURN_VALUE },
    );
    this.name = 'ReturnValueExceededError';
  }
}
