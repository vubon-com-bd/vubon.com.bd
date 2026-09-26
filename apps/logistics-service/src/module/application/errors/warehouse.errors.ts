import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class WarehouseOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Warehouse operation failed: ${reason}`, { reason });
  }
}

export class InventoryAssignmentFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 409;

  constructor(warehouseId: string, reason: string) {
    super(`Inventory assignment failed: ${reason}`, { warehouseId, reason });
  }
}
