/**
 * Collection Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CollectionEntity } from '../entities/collection.entity.js';
import { CollectionSlugVO } from '../value-objects/primitives/collection-slug.vo.js';
import { CollectionIdVO } from '../value-objects/primitives/collection-id.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export const COLLECTION_REPOSITORY = Symbol('COLLECTION_REPOSITORY');

export interface CollectionPaginationOptions {
  readonly page: number;
  readonly limit: number;
  readonly type?: string;
  readonly status?: string;
  readonly isFeatured?: boolean;
}

export interface CollectionPaginationResult {
  readonly items: readonly CollectionEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}

export interface CollectionRepository extends BaseRepository<CollectionEntity, string> {
  findByIdVO(id: CollectionIdVO): Promise<CollectionEntity | null>;
  findBySlug(slug: CollectionSlugVO): Promise<CollectionEntity | null>;
  existsBySlug(slug: CollectionSlugVO): Promise<boolean>;
  findByProductId(productId: ProductIdVO): Promise<readonly CollectionEntity[]>;
  findFeatured(limit?: number): Promise<readonly CollectionEntity[]>;
  findActive(now: string): Promise<readonly CollectionEntity[]>;
  findPaginated(options: CollectionPaginationOptions): Promise<CollectionPaginationResult>;
  addProduct(collectionId: string, productId: ProductIdVO): Promise<void>;
  removeProduct(collectionId: string, productId: ProductIdVO): Promise<void>;
  countByProductId(productId: ProductIdVO): Promise<number>;
}
