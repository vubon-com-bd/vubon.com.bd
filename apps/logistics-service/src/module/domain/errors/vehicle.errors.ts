import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class VehicleNotAvailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VEHICLE_NOT_AVAILABLE;
  readonly httpStatus = 409;

  constructor(vehicleId: string) {
    super(`Vehicle not available: ${vehicleId}`, { vehicleId });
  }
}

export class VehicleNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VEHICLE_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(vehicleId: string) {
    super(`Vehicle not found: ${vehicleId}`, { vehicleId });
  }
}
