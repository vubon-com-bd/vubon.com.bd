/**
 * Driver Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { DriverEntity } from '../entities/driver.entity.js';
import type { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';

export const DRIVER_REPOSITORY = Symbol('DRIVER_REPOSITORY');

export interface DriverListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly isAvailable?: boolean;
  readonly minRating?: number;
  readonly licenseExpiringInDays?: number;
  readonly search?: string;
}

export interface DriverListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'rating' | 'totalDeliveries';
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

export interface DriverStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly availableCount: number;
  readonly onDutyCount: number;
  readonly averageRating: number;
  readonly totalCashInHand: number;
}

export interface DriverRepository extends BaseRepository<DriverEntity, string> {
  findByIdVO(id: DriverIdVO): Promise<DriverEntity | null>;
  findByLicenseNumber(licenseNumber: string): Promise<DriverEntity | null>;
  findByUserId(userId: string): Promise<DriverEntity | null>;
  findByPhone(phone: string): Promise<DriverEntity | null>;
  findByStatus(status: string): Promise<readonly DriverEntity[]>;
  findByWarehouseId(warehouseId: string): Promise<readonly DriverEntity[]>;
  findByVehicleId(vehicleId: string): Promise<DriverEntity | null>;
  findAvailable(): Promise<readonly DriverEntity[]>;
  findPaginated(options: DriverListOptions): Promise<DriverPaginationResult>;
  getStats(): Promise<DriverStats>;
  findLicenseExpiring(withinDays: number): Promise<readonly DriverEntity[]>;
  findCashLimitReached(): Promise<readonly DriverEntity[]>;
  existsByLicenseNumber(licenseNumber: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
