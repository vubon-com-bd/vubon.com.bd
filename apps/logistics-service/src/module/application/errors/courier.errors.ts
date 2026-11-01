/**
 * Courier Application Errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

// ─── Not Found ───
export class CourierNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(courierId: string) {
    super('Courier', courierId);
    this.name = 'CourierNotFoundApplicationError';
  }
}
export class CourierByCodeNotFoundError extends ApplicationNotFoundError {
  constructor(code: string) {
    super('Courier', `code:${code}`);
    this.name = 'CourierByCodeNotFoundError';
  }
}

// ─── Validation ───
export class CreateCourierError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Courier.create] ${message}`, field);
    this.name = 'CreateCourierError';
  }
}
export class UpdateCourierError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Courier.update] ${message}`, field);
    this.name = 'UpdateCourierError';
  }
}
export class ActivateCourierError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Courier.activate] ${message}`, field);
    this.name = 'ActivateCourierError';
  }
}
export class DeactivateCourierError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Courier.deactivate] ${message}`, field);
    this.name = 'DeactivateCourierError';
  }
}
export class SuspendCourierError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Courier.suspend] ${message}`, field);
    this.name = 'SuspendCourierError';
  }
}
export class TerminateCourierError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Courier.terminate] ${message}`, field);
    this.name = 'TerminateCourierError';
  }
}
export class AssignCourierToShipmentError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(`[Courier.assignToShipment] ${message}`, field);
    this.name = 'AssignCourierToShipmentError';
  }
}

// ─── Conflict ───
export class CourierAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.COURIER_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(code: string) {
    super(`Courier with code "${code}" already exists`, { code });
    this.name = 'CourierAlreadyExistsError';
  }
}

// ─── Business ───
export class CourierBusinessRuleError extends ApplicationError {
  readonly code = ERROR_CODE.COURIER_UNAVAILABLE;
  readonly httpStatus = 400;
  constructor(message: string, rule: string, context?: Record<string, unknown>) {
    super(message, { rule, ...context });
    this.name = 'CourierBusinessRuleError';
  }
}

export class CourierNotOperationalError extends ApplicationError {
  readonly code = ERROR_CODE.COURIER_UNAVAILABLE;
  readonly httpStatus = 400;
  constructor(courierId: string, status: string) {
    super(`Courier "${courierId}" is not operational (status: "${status}")`, {
      courierId,
      status,
    });
    this.name = 'CourierNotOperationalError';
  }
}

export class CourierOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(operation: string, cause: string) {
    super(`Courier.${operation} failed: ${cause}`, { operation });
    this.name = 'CourierOperationError';
  }
}
