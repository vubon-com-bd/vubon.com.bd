/**
 * Dispatch Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DispatchEntity } from '../entities/dispatch.entity.js';
import { DispatchIdVO } from '../value-objects/primitives/dispatch-id.vo.js';
import { DispatchNumberVO } from '../value-objects/primitives/dispatch-number.vo.js';
import { DispatchStatusVO } from '../value-objects/primitives/dispatch-status.vo.js';
import { DispatchTypeVO } from '../value-objects/primitives/dispatch-type.vo.js';
import { CourierIdVO } from '../value-objects/primitives/courier-id.vo.js';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';

export const DISPATCH_REPOSITORY = Symbol('DISPATCH_REPOSITORY');

export interface DispatchListFilter {
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly driverId?: string;
  readonly status?: string;
  readonly type?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface DispatchListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'dispatchedAt' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DispatchListFilter;
}

export interface DispatchPaginationResult {
  readonly items: readonly DispatchEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface DispatchRepository extends BaseRepository<DispatchEntity, string> {
  findByIdVO(id: DispatchIdVO): Promise<DispatchEntity | null>;
  findByNumber(dispatchNumber: DispatchNumberVO): Promise<DispatchEntity | null>;
  findByStatus(status: DispatchStatusVO): Promise<readonly DispatchEntity[]>;
  findByType(type: DispatchTypeVO): Promise<readonly DispatchEntity[]>;
  findByCourier(courierId: CourierIdVO): Promise<readonly DispatchEntity[]>;
  findByWarehouse(warehouseId: WarehouseIdVO): Promise<readonly DispatchEntity[]>;
  findByDriver(driverId: DriverIdVO): Promise<readonly DispatchEntity[]>;
  /** Find dispatch containing a specific shipment. */
  findByShipmentId(shipmentId: string): Promise<DispatchEntity | null>;
  findPending(): Promise<readonly DispatchEntity[]>;
  findInFlight(): Promise<readonly DispatchEntity[]>;
  findPaginated(options: DispatchListOptions): Promise<DispatchPaginationResult>;
  existsByNumber(dispatchNumber: DispatchNumberVO): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
