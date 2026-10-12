/**
 * Warehouse Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { WarehouseEntity } from '../entities/warehouse.entity.js';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';
import { WarehouseCodeVO } from '../value-objects/primitives/warehouse-code.vo.js';
import { WarehouseStatusVO } from '../value-objects/primitives/warehouse-status.vo.js';
import { WarehouseTypeVO } from '../value-objects/primitives/warehouse-type.vo.js';

export const WAREHOUSE_REPOSITORY = Symbol('WAREHOUSE_REPOSITORY');

export interface WarehouseListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly zone?: string;
  readonly hasCapacity?: boolean;
  readonly search?: string;
}

export interface WarehouseListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'utilization';
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

export interface WarehouseRepository extends BaseRepository<WarehouseEntity, string> {
  findByIdVO(id: WarehouseIdVO): Promise<WarehouseEntity | null>;
  findByCode(code: WarehouseCodeVO): Promise<WarehouseEntity | null>;
  findByStatus(status: WarehouseStatusVO): Promise<readonly WarehouseEntity[]>;
  findByType(type: WarehouseTypeVO): Promise<readonly WarehouseEntity[]>;
  findByZone(zone: string): Promise<readonly WarehouseEntity[]>;
  findAcceptingInbound(): Promise<readonly WarehouseEntity[]>;
  findWithCapacity(volumeM3: number, weightKg: number): Promise<readonly WarehouseEntity[]>;
  findDefault(): Promise<WarehouseEntity | null>;
  findPaginated(options: WarehouseListOptions): Promise<WarehousePaginationResult>;
  existsByCode(code: WarehouseCodeVO): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
