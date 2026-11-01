/**
 * Route Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { RouteEntity } from '../entities/route.entity.js';
import type { RouteIdVO } from '../value-objects/primitives/route-id.vo.js';

export const ROUTE_REPOSITORY = Symbol('ROUTE_REPOSITORY');

export interface RouteListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly optimization?: string;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly scheduledDateFrom?: string;
  readonly scheduledDateTo?: string;
  readonly isOptimized?: boolean;
  readonly search?: string;
}

export interface RouteListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'scheduledDate';
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

export interface RouteStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly totalDistanceKm: number;
  readonly totalStops: number;
  readonly averageStopsPerRoute: number;
}

export interface RouteRepository extends BaseRepository<RouteEntity, string> {
  findByIdVO(id: RouteIdVO): Promise<RouteEntity | null>;
  findByCode(code: string): Promise<RouteEntity | null>;
  findByStatus(status: string): Promise<readonly RouteEntity[]>;
  findByWarehouseId(warehouseId: string): Promise<readonly RouteEntity[]>;
  findByDriverId(driverId: string): Promise<readonly RouteEntity[]>;
  findByVehicleId(vehicleId: string): Promise<readonly RouteEntity[]>;
  findContainingShipment(shipmentId: string): Promise<readonly RouteEntity[]>;
  findByScheduledDate(date: string): Promise<readonly RouteEntity[]>;
  findPaginated(options: RouteListOptions): Promise<RoutePaginationResult>;
  getStats(): Promise<RouteStats>;
  findActive(): Promise<readonly RouteEntity[]>;
  findPendingOptimization(): Promise<readonly RouteEntity[]>;
  existsByCode(code: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
