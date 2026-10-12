/**
 * Vehicle application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class VehicleNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VEHICLE_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly vehicleId: string) {
    super(`Vehicle "${vehicleId}" not found`, { vehicleId });
    this.name = 'VehicleNotFoundApplicationError';
  }
}

export class VehicleNotAvailableApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VEHICLE_NOT_AVAILABLE;
  readonly httpStatus = 409;
  constructor(public readonly vehicleId: string, reason: string) {
    super(`Vehicle "${vehicleId}" not available: ${reason}`, { vehicleId, reason });
    this.name = 'VehicleNotAvailableApplicationError';
  }
}

export class VehicleOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly vehicleId?: string) {
    super(`Vehicle ${operation} failed: ${reason}`, { operation, vehicleId });
    this.name = 'VehicleOperationFailedApplicationError';
  }
}
