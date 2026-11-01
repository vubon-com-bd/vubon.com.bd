/* istanbul ignore file -- pure error declarations */
/**
 * Delivery Domain Errors
 * @module notification-service/domain/errors
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

// ─── Validation (422) ──────────────────────
export class InvalidDeliveryStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid delivery status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidDeliveryStatusError';
  }
}

export class InvalidDeliveryAttemptError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid delivery attempt: ${reason}`, 'attempt');
    this.name = 'InvalidDeliveryAttemptError';
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

export class DeliveryMaxRetriesExceededError extends BusinessRuleError {
  constructor(deliveryId: string, maxRetries: number) {
    super(
      `Delivery "${deliveryId}" has exceeded maximum retries (${maxRetries})`,
      'DELIVERY_MAX_RETRIES_EXCEEDED',
      { deliveryId, maxRetries },
    );
    this.name = 'DeliveryMaxRetriesExceededError';
  }
}

export class DeliveryAlreadyFailedError extends BusinessRuleError {
  constructor(deliveryId: string) {
    super(
      `Delivery "${deliveryId}" has already failed`,
      'DELIVERY_ALREADY_FAILED',
      { deliveryId },
    );
    this.name = 'DeliveryAlreadyFailedError';
  }
}
