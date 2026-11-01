/**
 * Brand Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { BrandEntity } from '../entities/brand.entity.js';
import type { BrandIdVO } from '../value-objects/primitives/brand-id.vo.js';

export const BRAND_REPOSITORY = Symbol('BRAND_REPOSITORY');

export interface BrandListFilter {
  readonly status?: string | readonly string[];
  readonly isFeatured?: boolean;
  readonly country?: string;
  readonly search?: string;
}

export interface BrandListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'name' | 'createdAt' | 'productCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: BrandListFilter;
}

export interface BrandPaginationResult {
  readonly items: readonly BrandEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface BrandStats {
  readonly total: number;
  readonly activeCount: number;
  readonly featuredCount: number;
  readonly totalProducts: number;
}

export interface BrandRepository extends BaseRepository<BrandEntity, string> {
  findByIdVO(id: BrandIdVO): Promise<BrandEntity | null>;

  existsBySlug(slug: string): Promise<boolean>;
  findBySlug(slug: string): Promise<BrandEntity | null>;

  findByStatus(status: string): Promise<readonly BrandEntity[]>;
  findFeatured(limit?: number): Promise<readonly BrandEntity[]>;

  findPaginated(options: BrandListOptions): Promise<BrandPaginationResult>;

  getStats(filter?: BrandListFilter): Promise<BrandStats>;

  search(term: string, limit?: number): Promise<readonly BrandEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
