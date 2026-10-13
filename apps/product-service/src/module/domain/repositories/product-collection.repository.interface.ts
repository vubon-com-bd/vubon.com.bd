/**
 * Product Collection Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ProductCollectionEntity } from '../entities/product-collection.entity.js';
import type { CollectionIdVO } from '../value-objects/primitives/collection-id.vo.js';
import type { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export const COLLECTION_REPOSITORY = Symbol('COLLECTION_REPOSITORY');

export interface CollectionListFilter {
  readonly type?: string | readonly string[];
  readonly isActive?: boolean;
  readonly isFeatured?: boolean;
  readonly hasProduct?: string;
  readonly search?: string;
}

export interface CollectionListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'sortOrder' | 'name';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CollectionListFilter;
}

export interface CollectionPaginationResult {
  readonly items: readonly ProductCollectionEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CollectionStats {
  readonly total: number;
  readonly activeCount: number;
  readonly featuredCount: number;
  readonly totalProductRefs: number;
  readonly byType: Readonly<Record<string, number>>;
}

export interface ProductCollectionRepository extends BaseRepository<ProductCollectionEntity, string> {
  findByIdVO(id: CollectionIdVO): Promise<ProductCollectionEntity | null>;

  existsBySlug(slug: string): Promise<boolean>;
  findBySlug(slug: string): Promise<ProductCollectionEntity | null>;

  findByType(type: string): Promise<readonly ProductCollectionEntity[]>;
  findFeatured(limit?: number): Promise<readonly ProductCollectionEntity[]>;
  findActive(at: string): Promise<readonly ProductCollectionEntity[]>;
  findByProduct(productId: ProductIdVO): Promise<readonly ProductCollectionEntity[]>;

  findPaginated(options: CollectionListOptions): Promise<CollectionPaginationResult>;

  getStats(filter?: CollectionListFilter): Promise<CollectionStats>;

  // Cron
  findExpired(at: string): Promise<readonly ProductCollectionEntity[]>;
  findScheduledToActivate(at: string): Promise<readonly ProductCollectionEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
