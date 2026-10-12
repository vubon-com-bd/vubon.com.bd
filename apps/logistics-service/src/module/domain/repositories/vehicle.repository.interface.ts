/**
 * Vehicle Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VehicleEntity } from '../entities/vehicle.entity.js';
import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo.js';
import { VehicleStatusVO } from '../value-objects/primitives/vehicle-status.vo.js';
import { VehicleTypeVO } from '../value-objects/primitives/vehicle-type.vo.js';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';

export const VEHICLE_REPOSITORY = Symbol('VEHICLE_REPOSITORY');

export interface VehicleListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly fuelType?: string;
  readonly hasDriver?: boolean;
  readonly minCapacityKg?: number;
  readonly search?: string;
}

export interface VehicleListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'registrationNumber' | 'maxWeightKg';
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

export interface VehicleRepository extends BaseRepository<VehicleEntity, string> {
  findByIdVO(id: VehicleIdVO): Promise<VehicleEntity | null>;
  findByRegistration(registrationNumber: string): Promise<VehicleEntity | null>;
  findByStatus(status: VehicleStatusVO): Promise<readonly VehicleEntity[]>;
  findByType(type: VehicleTypeVO): Promise<readonly VehicleEntity[]>;
  findByDriver(driverId: DriverIdVO): Promise<VehicleEntity | null>;
  findAvailable(): Promise<readonly VehicleEntity[]>;
  findCapableOf(weightKg: number, volumeM3?: number): Promise<readonly VehicleEntity[]>;
  findNeedingService(withinDays: number): Promise<readonly VehicleEntity[]>;
  findPaginated(options: VehicleListOptions): Promise<VehiclePaginationResult>;
  existsByRegistration(registrationNumber: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
