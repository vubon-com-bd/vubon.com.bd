/**
 * Route Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { RouteEntity } from '../entities/route.entity.js';
import { RouteIdVO } from '../value-objects/primitives/route-id.vo.js';
import { RouteCodeVO } from '../value-objects/primitives/route-code.vo.js';
import { RouteStatusVO } from '../value-objects/primitives/route-status.vo.js';
import { RouteTypeVO } from '../value-objects/primitives/route-type.vo.js';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';
import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo.js';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';

export const ROUTE_REPOSITORY = Symbol('ROUTE_REPOSITORY');

export interface RouteListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly warehouseId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface RouteListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'scheduledDate' | 'name' | 'totalDistanceKm';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: RouteListFilter;
}

export interface RoutePaginationResult {
  readonly items: readonly RouteEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface RouteRepository extends BaseRepository<RouteEntity, string> {
  findByIdVO(id: RouteIdVO): Promise<RouteEntity | null>;
  findByCode(code: RouteCodeVO): Promise<RouteEntity | null>;
  findByStatus(status: RouteStatusVO): Promise<readonly RouteEntity[]>;
  findByType(type: RouteTypeVO): Promise<readonly RouteEntity[]>;
  findByDriver(driverId: DriverIdVO): Promise<readonly RouteEntity[]>;
  findByVehicle(vehicleId: VehicleIdVO): Promise<readonly RouteEntity[]>;
  findByWarehouse(warehouseId: WarehouseIdVO): Promise<readonly RouteEntity[]>;
  findActive(): Promise<readonly RouteEntity[]>;
  findScheduledFor(date: string): Promise<readonly RouteEntity[]>;
  findPaginated(options: RouteListOptions): Promise<RoutePaginationResult>;
  existsByCode(code: RouteCodeVO): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
