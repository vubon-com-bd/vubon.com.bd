/**
 * Vehicle Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VehicleEntity } from '../entities/vehicle.entity.js';
import type { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo.js';

export const VEHICLE_REPOSITORY = Symbol('VEHICLE_REPOSITORY');

export interface VehicleListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly fuelType?: string;
  readonly warehouseId?: string;
  readonly assignedDriverId?: string;
  readonly minWeightKg?: number;
  readonly search?: string;
}

export interface VehicleListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'year' | 'maxWeightKg';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VehicleListFilter;
}

export interface VehiclePaginationResult {
  readonly items: readonly VehicleEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VehicleStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byFuelType: Readonly<Record<string, number>>;
  readonly availableCount: number;
  readonly inUseCount: number;
}

export interface VehicleRepository extends BaseRepository<VehicleEntity, string> {
  findByIdVO(id: VehicleIdVO): Promise<VehicleEntity | null>;
  findByRegistrationNumber(registrationNumber: string): Promise<VehicleEntity | null>;
  findByStatus(status: string): Promise<readonly VehicleEntity[]>;
  findByType(type: string): Promise<readonly VehicleEntity[]>;
  findByWarehouseId(warehouseId: string): Promise<readonly VehicleEntity[]>;
  findByDriverId(driverId: string): Promise<VehicleEntity | null>;
  findAvailable(): Promise<readonly VehicleEntity[]>;
  findPaginated(options: VehicleListOptions): Promise<VehiclePaginationResult>;
  getStats(): Promise<VehicleStats>;
  findMaintenanceDue(): Promise<readonly VehicleEntity[]>;
  findExpiringInsurance(withinDays: number): Promise<readonly VehicleEntity[]>;
  existsByRegistrationNumber(registrationNumber: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
