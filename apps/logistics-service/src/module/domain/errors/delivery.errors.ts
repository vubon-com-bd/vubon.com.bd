/**
 * Delivery domain errors
 * @module logistics-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { DELIVERY_STATUS, DELIVERY_TYPE, DELIVERY_ATTEMPT_STATUS, DELIVERY } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(DELIVERY_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(DELIVERY_TYPE) as readonly string[];
const ALLOWED_ATTEMPT_STATUSES = Object.values(DELIVERY_ATTEMPT_STATUS) as readonly string[];

export class DeliveryNotFoundError extends NotFoundError {
  constructor(deliveryId: string) {
    super('Delivery', deliveryId);
    this.name = 'DeliveryNotFoundError';
  }
}

export class InvalidDeliveryStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid delivery status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidDeliveryStatusError';
  }
}

export class InvalidDeliveryTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid delivery type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidDeliveryTypeError';
  }
}

export class InvalidDeliveryAttemptStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid delivery attempt status "${value}". Allowed: ${ALLOWED_ATTEMPT_STATUSES.join(', ')}`, 'attemptStatus');
    this.name = 'InvalidDeliveryAttemptStatusError';
  }
}

export class InvalidDeliveryStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition delivery status from "${from}" to "${to}"`,
      'INVALID_DELIVERY_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidDeliveryStatusTransitionError';
  }
}

export class DeliveryAttemptLimitExceededError extends BusinessRuleError {
  constructor(deliveryId: string, attempts: number) {
    super(
      `Delivery "${deliveryId}" exceeded max attempts (${attempts}/${DELIVERY.MAX_ATTEMPTS})`,
      'DELIVERY_ATTEMPT_EXCEEDED',
      { deliveryId, attempts, max: DELIVERY.MAX_ATTEMPTS },
    );
    this.name = 'DeliveryAttemptLimitExceededError';
  }
}

export class DeliveryProofRequiredError extends BusinessRuleError {
  constructor() {
    super('Proof of delivery is required to mark delivery as complete', 'DELIVERY_PROOF_REQUIRED');
    this.name = 'DeliveryProofRequiredError';
  }
}

export class DeliveryWindowExpiredError extends BusinessRuleError {
  constructor(deliveryId: string) {
    super(
      `Delivery window for "${deliveryId}" has expired`,
      'DELIVERY_WINDOW_EXPIRED',
      { deliveryId },
    );
    this.name = 'DeliveryWindowExpiredError';
  }
}

export class DeliveryCannotBeRescheduledError extends BusinessRuleError {
  constructor(deliveryId: string, status: string) {
    super(
      `Delivery "${deliveryId}" cannot be rescheduled from status "${status}"`,
      'DELIVERY_CANNOT_BE_RESCHEDULED',
      { deliveryId, status },
    );
    this.name = 'DeliveryCannotBeRescheduledError';
  }
}
