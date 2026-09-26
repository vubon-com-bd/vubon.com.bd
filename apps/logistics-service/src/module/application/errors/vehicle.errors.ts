import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class VehicleOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Vehicle operation failed: ${reason}`, { reason });
  }
}

export class VehicleRegistrationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(vehicleNumber: string) {
    super(`Vehicle registration failed: ${vehicleNumber} exists`, { vehicleNumber });
  }
}
