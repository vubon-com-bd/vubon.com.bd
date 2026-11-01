/**
 * Category Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CategoryEntity } from '../entities/category.entity.js';
import type { CategoryIdVO } from '../value-objects/primitives/category-id.vo.js';

export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');

export interface CategoryListFilter {
  readonly status?: string | readonly string[];
  readonly parentId?: string;
  readonly depth?: number;
  readonly isFeatured?: boolean;
  readonly hasProducts?: boolean;
  readonly search?: string;
}

export interface CategoryListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'name' | 'sortOrder' | 'createdAt' | 'productCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CategoryListFilter;
}

export interface CategoryPaginationResult {
  readonly items: readonly CategoryEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CategoryStats {
  readonly total: number;
  readonly activeCount: number;
  readonly rootCount: number;
  readonly maxDepth: number;
  readonly totalProducts: number;
  readonly byDepth: Readonly<Record<number, number>>;
}

export interface CategoryRepository extends BaseRepository<CategoryEntity, string> {
  findByIdVO(id: CategoryIdVO): Promise<CategoryEntity | null>;

  existsBySlug(slug: string): Promise<boolean>;
  findBySlug(slug: string): Promise<CategoryEntity | null>;

  findRoots(): Promise<readonly CategoryEntity[]>;
  findChildren(parentId: CategoryIdVO): Promise<readonly CategoryEntity[]>;
  findDescendants(path: readonly string[]): Promise<readonly CategoryEntity[]>;
  findAncestors(id: CategoryIdVO): Promise<readonly CategoryEntity[]>;
  findFeatured(limit?: number): Promise<readonly CategoryEntity[]>;
  findByStatus(status: string): Promise<readonly CategoryEntity[]>;

  findPaginated(options: CategoryListOptions): Promise<CategoryPaginationResult>;

  getStats(filter?: CategoryListFilter): Promise<CategoryStats>;

  countChildren(parentId: CategoryIdVO): Promise<number>;

  // Tree
  loadTree(rootId?: CategoryIdVO): Promise<readonly CategoryEntity[]>;

  // Reorder
  reorder(orders: readonly { id: string; sortOrder: number }[]): Promise<void>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
