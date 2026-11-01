/**
 * Warehouse Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { WarehouseEntity } from '../entities/warehouse.entity.js';
import type { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';

export const WAREHOUSE_REPOSITORY = Symbol('WAREHOUSE_REPOSITORY');

export interface WarehouseListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly zone?: string;
  readonly isDefault?: boolean;
  readonly minCapacityM3?: number;
  readonly search?: string;
}

export interface WarehouseListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'capacityM3';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: WarehouseListFilter;
}

export interface WarehousePaginationResult {
  readonly items: readonly WarehouseEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface WarehouseStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly totalCapacityM3: number;
  readonly totalUsedM3: number;
  readonly utilizationPercent: number;
}

export interface WarehouseRepository extends BaseRepository<WarehouseEntity, string> {
  findByIdVO(id: WarehouseIdVO): Promise<WarehouseEntity | null>;
  findByCode(code: string): Promise<WarehouseEntity | null>;
  findByStatus(status: string): Promise<readonly WarehouseEntity[]>;
  findByZone(zone: string): Promise<readonly WarehouseEntity[]>;
  findDefault(): Promise<WarehouseEntity | null>;
  findOperational(): Promise<readonly WarehouseEntity[]>;
  findPaginated(options: WarehouseListOptions): Promise<WarehousePaginationResult>;
  getStats(): Promise<WarehouseStats>;
  existsByCode(code: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
