/**
 * Dispatch Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { DispatchEntity } from '../entities/dispatch.entity.js';
import type { DispatchIdVO } from '../value-objects/primitives/dispatch-id.vo.js';

export const DISPATCH_REPOSITORY = Symbol('DISPATCH_REPOSITORY');

export interface DispatchListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly courierId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly warehouseId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface DispatchListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'dispatchedAt';
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

export interface DispatchStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly totalShipments: number;
  readonly averageShipmentsPerDispatch: number;
}

export interface DispatchRepository extends BaseRepository<DispatchEntity, string> {
  findByIdVO(id: DispatchIdVO): Promise<DispatchEntity | null>;
  findByDispatchNumber(dispatchNumber: string): Promise<DispatchEntity | null>;
  findByStatus(status: string): Promise<readonly DispatchEntity[]>;
  findByCourierId(courierId: string): Promise<readonly DispatchEntity[]>;
  findByDriverId(driverId: string): Promise<readonly DispatchEntity[]>;
  findByVehicleId(vehicleId: string): Promise<readonly DispatchEntity[]>;
  findContainingShipment(shipmentId: string): Promise<readonly DispatchEntity[]>;
  findPaginated(options: DispatchListOptions): Promise<DispatchPaginationResult>;
  getStats(): Promise<DispatchStats>;
  findStale(olderThanMinutes: number): Promise<readonly DispatchEntity[]>;
  findPending(): Promise<readonly DispatchEntity[]>;
  findInTransit(): Promise<readonly DispatchEntity[]>;
  existsByDispatchNumber(dispatchNumber: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
