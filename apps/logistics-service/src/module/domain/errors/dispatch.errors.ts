/**
 * Dispatch domain errors
 * @module logistics-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { DISPATCH_STATUS, DISPATCH_TYPE, DISPATCH } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(DISPATCH_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(DISPATCH_TYPE) as readonly string[];

export class DispatchNotFoundError extends NotFoundError {
  constructor(dispatchId: string) {
    super('Dispatch', dispatchId);
    this.name = 'DispatchNotFoundError';
  }
}

export class InvalidDispatchStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid dispatch status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidDispatchStatusError';
  }
}

export class InvalidDispatchTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid dispatch type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidDispatchTypeError';
  }
}

export class InvalidDispatchStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition dispatch status from "${from}" to "${to}"`,
      'INVALID_DISPATCH_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidDispatchStatusTransitionError';
  }
}

export class DispatchItemLimitExceededError extends BusinessRuleError {
  constructor(count: number) {
    super(
      `Dispatch item count ${count} exceeds maximum ${DISPATCH.MAX_ITEMS_PER_DISPATCH}`,
      'DISPATCH_ITEM_LIMIT_EXCEEDED',
      { count, max: DISPATCH.MAX_ITEMS_PER_DISPATCH },
    );
    this.name = 'DispatchItemLimitExceededError';
  }
}

export class DispatchAlreadyStartedError extends BusinessRuleError {
  constructor(dispatchId: string) {
    super(
      `Dispatch "${dispatchId}" has already started and cannot be modified`,
      'DISPATCH_ALREADY_STARTED',
      { dispatchId },
    );
    this.name = 'DispatchAlreadyStartedError';
  }
}

export class DispatchAlreadyCompletedError extends BusinessRuleError {
  constructor(dispatchId: string) {
    super(
      `Dispatch "${dispatchId}" is already completed`,
      'DISPATCH_ALREADY_COMPLETED',
      { dispatchId },
    );
    this.name = 'DispatchAlreadyCompletedError';
  }
}

export class DispatchCutoffExceededError extends BusinessRuleError {
  constructor(cutoffHour: number) {
    super(
      `Dispatch cutoff hour ${cutoffHour}:00 has passed for today`,
      'DISPATCH_CUTOFF_EXCEEDED',
      { cutoffHour },
    );
    this.name = 'DispatchCutoffExceededError';
  }
}
