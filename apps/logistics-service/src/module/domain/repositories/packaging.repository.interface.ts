/**
 * Packaging Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { PackagingEntity } from '../entities/packaging.entity.js';
import type { PackagingIdVO } from '../value-objects/primitives/packaging-id.vo.js';

export const PACKAGING_REPOSITORY = Symbol('PACKAGING_REPOSITORY');

export interface PackagingListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly material?: string;
  readonly isFragile?: boolean;
  readonly isRecyclable?: boolean;
  readonly isTemperatureControlled?: boolean;
  readonly minStock?: number;
  readonly maxStock?: number;
  readonly search?: string;
}

export interface PackagingListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'stock' | 'cost';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PackagingListFilter;
}

export interface PackagingPaginationResult {
  readonly items: readonly PackagingEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface PackagingStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly totalStock: number;
  readonly outOfStockCount: number;
  readonly ecoFriendlyCount: number;
}

export interface PackagingRepository extends BaseRepository<PackagingEntity, string> {
  findByIdVO(id: PackagingIdVO): Promise<PackagingEntity | null>;
  findByCode(code: string): Promise<PackagingEntity | null>;
  findByStatus(status: string): Promise<readonly PackagingEntity[]>;
  findByType(type: string): Promise<readonly PackagingEntity[]>;
  findDefault(): Promise<PackagingEntity | null>;
  findUsable(): Promise<readonly PackagingEntity[]>;
  findByMaxWeight(minWeightKg: number): Promise<readonly PackagingEntity[]>;
  findOutOfStock(): Promise<readonly PackagingEntity[]>;
  findPaginated(options: PackagingListOptions): Promise<PackagingPaginationResult>;
  getStats(): Promise<PackagingStats>;
  existsByCode(code: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
