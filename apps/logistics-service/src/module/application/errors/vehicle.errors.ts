/**
 * Vehicle Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class VehicleNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('Vehicle', id); this.name = 'VehicleNotFoundApplicationError'; }
}
export class VehicleByRegistrationNotFoundError extends ApplicationNotFoundError {
  constructor(reg: string) { super('Vehicle', `reg:${reg}`); this.name = 'VehicleByRegistrationNotFoundError'; }
}

export class CreateVehicleError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Vehicle.create] ${msg}`, field); this.name = 'CreateVehicleError'; }
}
export class UpdateVehicleError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Vehicle.update] ${msg}`, field); this.name = 'UpdateVehicleError'; }
}
export class VehicleActionError extends ApplicationValidationError {
  constructor(action: string, msg: string, field?: string) { super(`[Vehicle.${action}] ${msg}`, field); this.name = 'VehicleActionError'; }
}

export class VehicleAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.VEHICLE_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(reg: string) { super(`Vehicle "${reg}" already exists`, { reg }); this.name = 'VehicleAlreadyExistsError'; }
}
export class VehicleStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_VEHICLE_STATUS_TRANSITION;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Vehicle "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'VehicleStateConflictError';
  }
}
export class VehicleNotAvailableError extends ApplicationError {
  readonly code = ERROR_CODE.VEHICLE_NOT_AVAILABLE;
  readonly httpStatus = 400;
  constructor(id: string, status: string) {
    super(`Vehicle "${id}" is not available (status: "${status}")`, { id, status });
    this.name = 'VehicleNotAvailableError';
  }
}
export class VehicleOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`Vehicle.${op} failed: ${cause}`, { op }); this.name = 'VehicleOperationError'; }
}
