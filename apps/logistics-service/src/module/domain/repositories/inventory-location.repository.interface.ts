/**
 * InventoryLocation Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { InventoryLocationEntity } from '../entities/inventory-location.entity.js';
import type { InventoryLocationIdVO } from '../value-objects/primitives/inventory-location-id.vo.js';

export const INVENTORY_LOCATION_REPOSITORY = Symbol('INVENTORY_LOCATION_REPOSITORY');

export interface InventoryLocationListFilter {
  readonly warehouseId?: string;
  readonly zone?: string;
  readonly status?: string;
  readonly isActive?: boolean;
  readonly isPickable?: boolean;
  readonly isQuarantine?: boolean;
  readonly minCapacityKg?: number;
  readonly search?: string;
}

export interface InventoryLocationListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'currentKg';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: InventoryLocationListFilter;
}

export interface InventoryLocationPaginationResult {
  readonly items: readonly InventoryLocationEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface InventoryLocationStats {
  readonly total: number;
  readonly byZone: Readonly<Record<string, number>>;
  readonly activeCount: number;
  readonly pickableCount: number;
  readonly quarantineCount: number;
}

export interface InventoryLocationRepository
  extends BaseRepository<InventoryLocationEntity, string> {
  findByIdVO(id: InventoryLocationIdVO): Promise<InventoryLocationEntity | null>;
  findByWarehouseId(warehouseId: string): Promise<readonly InventoryLocationEntity[]>;
  findByCode(code: string): Promise<InventoryLocationEntity | null>;
  findByBarcode(barcode: string): Promise<InventoryLocationEntity | null>;
  findByZone(warehouseId: string, zone: string): Promise<readonly InventoryLocationEntity[]>;
  findPickable(warehouseId: string): Promise<readonly InventoryLocationEntity[]>;
  findPaginated(options: InventoryLocationListOptions): Promise<InventoryLocationPaginationResult>;
  getStats(warehouseId?: string): Promise<InventoryLocationStats>;
  existsByCode(code: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
