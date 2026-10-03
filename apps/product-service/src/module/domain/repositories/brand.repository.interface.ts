/**
 * Brand Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { BrandEntity } from '../entities/brand.entity.js';
import { BrandSlugVO } from '../value-objects/primitives/brand-slug.vo.js';
import { BrandIdVO } from '../value-objects/primitives/brand-id.vo.js';

export const BRAND_REPOSITORY = Symbol('BRAND_REPOSITORY');

export interface BrandPaginationOptions {
  readonly page: number;
  readonly limit: number;
  readonly search?: string;
  readonly status?: string;
  readonly isFeatured?: boolean;
}

export interface BrandPaginationResult {
  readonly items: readonly BrandEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}

export interface BrandRepository extends BaseRepository<BrandEntity, string> {
  findByIdVO(id: BrandIdVO): Promise<BrandEntity | null>;
  findBySlug(slug: BrandSlugVO): Promise<BrandEntity | null>;
  existsBySlug(slug: BrandSlugVO): Promise<boolean>;
  findFeatured(limit?: number): Promise<readonly BrandEntity[]>;
  findActive(): Promise<readonly BrandEntity[]>;
  findPaginated(options: BrandPaginationOptions): Promise<BrandPaginationResult>;
  findByIds(ids: readonly string[]): Promise<readonly BrandEntity[]>;
}
