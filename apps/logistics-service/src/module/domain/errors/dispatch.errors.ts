/**
 * Dispatch Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DispatchNotFoundError extends NotFoundError {
  constructor(dispatchId: string) {
    super('Dispatch', dispatchId);
    this.name = 'DispatchNotFoundError';
  }
}

export class DispatchNumberAlreadyExistsError extends ConflictError {
  constructor(dispatchNumber: string) {
    super(`Dispatch "${dispatchNumber}" already exists`, 'dispatchNumber');
    this.name = 'DispatchNumberAlreadyExistsError';
  }
}

export class InvalidDispatchStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid dispatch status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidDispatchStatusError';
  }
}

export class InvalidDispatchTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid dispatch type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidDispatchTypeError';
  }
}

export class DispatchAlreadyStartedError extends BusinessRuleError {
  constructor(dispatchId: string) {
    super(
      `Dispatch "${dispatchId}" has already started`,
      'DISPATCH_ALREADY_STARTED',
      { dispatchId },
    );
    this.name = 'DispatchAlreadyStartedError';
  }
}

export class DispatchAlreadyCompletedError extends BusinessRuleError {
  constructor(dispatchId: string, completedAt: string) {
    super(
      `Dispatch "${dispatchId}" already completed at ${completedAt}`,
      'DISPATCH_ALREADY_COMPLETED',
      { dispatchId, completedAt },
    );
    this.name = 'DispatchAlreadyCompletedError';
  }
}

export class DispatchCannotBeCancelledError extends BusinessRuleError {
  constructor(dispatchId: string, status: string) {
    super(
      `Dispatch "${dispatchId}" cannot be cancelled in status "${status}"`,
      'DISPATCH_CANNOT_BE_CANCELLED',
      { dispatchId, status },
    );
    this.name = 'DispatchCannotBeCancelledError';
  }
}

export class DispatchNoItemsError extends BusinessRuleError {
  constructor(dispatchId: string) {
    super(
      `Dispatch "${dispatchId}" must contain at least one shipment`,
      'DISPATCH_NO_ITEMS',
      { dispatchId },
    );
    this.name = 'DispatchNoItemsError';
  }
}

export class DispatchItemLimitExceededError extends BusinessRuleError {
  constructor(actual: number, max: number) {
    super(
      `Dispatch item count ${actual} exceeds max ${max}`,
      'DISPATCH_ITEM_LIMIT_EXCEEDED',
      { actual, max },
    );
    this.name = 'DispatchItemLimitExceededError';
  }
}

export class DispatchRequiresCourierOrVehicleError extends BusinessRuleError {
  constructor(dispatchId: string) {
    super(
      `Dispatch "${dispatchId}" requires a courier or vehicle`,
      'DISPATCH_REQUIRES_COURIER_OR_VEHICLE',
      { dispatchId },
    );
    this.name = 'DispatchRequiresCourierOrVehicleError';
  }
}
