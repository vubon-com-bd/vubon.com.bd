import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class WarehouseNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.WAREHOUSE_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(warehouseId: string) {
    super(`Warehouse not found: ${warehouseId}`, { warehouseId });
  }
}

export class CapacityExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.CAPACITY_EXCEEDED;
  readonly httpStatus = 409;

  constructor(warehouseId: string, requested: number, available: number) {
    super(`Capacity exceeded: ${requested} > ${available}`, {
      warehouseId,
      requested,
      available,
    });
  }
}
