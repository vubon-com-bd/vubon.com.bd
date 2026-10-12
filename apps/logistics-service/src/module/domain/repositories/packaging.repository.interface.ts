/**
 * Packaging Repository Interface
 * @module logistics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PackagingEntity } from '../entities/packaging.entity.js';
import { PackagingIdVO } from '../value-objects/primitives/packaging-id.vo.js';
import { PackagingStatusVO } from '../value-objects/primitives/packaging-status.vo.js';
import { PackagingTypeVO } from '../value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '../value-objects/primitives/packaging-material.vo.js';

export const PACKAGING_REPOSITORY = Symbol('PACKAGING_REPOSITORY');

export interface PackagingListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly material?: string;
  readonly isFragile?: boolean;
  readonly inStock?: boolean;
  readonly search?: string;
}

export interface PackagingListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'stock' | 'maxWeightKg';
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

export interface PackagingRepository extends BaseRepository<PackagingEntity, string> {
  findByIdVO(id: PackagingIdVO): Promise<PackagingEntity | null>;
  findByCode(code: string): Promise<PackagingEntity | null>;
  findByStatus(status: PackagingStatusVO): Promise<readonly PackagingEntity[]>;
  findByType(type: PackagingTypeVO): Promise<readonly PackagingEntity[]>;
  findByMaterial(material: PackagingMaterialVO): Promise<readonly PackagingEntity[]>;
  findInStock(): Promise<readonly PackagingEntity[]>;
  findDefault(): Promise<PackagingEntity | null>;
  /** Usable packagings that can hold the given weight + dims. */
  findCapableOf(weightKg: number, dims?: { lengthCm: number; widthCm: number; heightCm: number }): Promise<readonly PackagingEntity[]>;
  findLowStock(threshold: number): Promise<readonly PackagingEntity[]>;
  findPaginated(options: PackagingListOptions): Promise<PackagingPaginationResult>;
  existsByCode(code: string): Promise<boolean>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
