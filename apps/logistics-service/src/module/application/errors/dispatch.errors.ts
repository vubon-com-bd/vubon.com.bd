import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class DispatchOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Dispatch operation failed: ${reason}`, { reason });
  }
}

export class DriverAssignmentFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(driverId: string, reason: string) {
    super(`Driver assignment failed: ${reason}`, { driverId, reason });
  }
}

export class VehicleAssignmentFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(vehicleId: string, reason: string) {
    super(`Vehicle assignment failed: ${reason}`, { vehicleId, reason });
  }
}
