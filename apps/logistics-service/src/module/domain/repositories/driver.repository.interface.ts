/**
 * Driver Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DriverEntity } from '../entities/driver.entity.js';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';
import { DriverStatusVO } from '../value-objects/primitives/driver-status.vo.js';
import { DriverTypeVO } from '../value-objects/primitives/driver-type.vo.js';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';
import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo.js';

export const DRIVER_REPOSITORY = Symbol('DRIVER_REPOSITORY');

export interface DriverListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly isAvailable?: boolean;
  readonly minRating?: number;
  readonly search?: string;
}

export interface DriverListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'rating' | 'totalDeliveries';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DriverListFilter;
}

export interface DriverPaginationResult {
  readonly items: readonly DriverEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface DriverRepository extends BaseRepository<DriverEntity, string> {
  findByIdVO(id: DriverIdVO): Promise<DriverEntity | null>;
  findByLicense(licenseNumber: string): Promise<DriverEntity | null>;
  findByStatus(status: DriverStatusVO): Promise<readonly DriverEntity[]>;
  findByType(type: DriverTypeVO): Promise<readonly DriverEntity[]>;
  findByWarehouse(warehouseId: WarehouseIdVO): Promise<readonly DriverEntity[]>;
  findByVehicle(vehicleId: VehicleIdVO): Promise<DriverEntity | null>;
  findAvailable(): Promise<readonly DriverEntity[]>;
  findAssignable(warehouseId?: string): Promise<readonly DriverEntity[]>;
  findWithExpiringLicense(withinDays: number): Promise<readonly DriverEntity[]>;
  findPaginated(options: DriverListOptions): Promise<DriverPaginationResult>;
  existsByLicense(licenseNumber: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
