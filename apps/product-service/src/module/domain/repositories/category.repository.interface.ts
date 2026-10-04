/**
 * Category Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CategoryEntity } from '../entities/category.entity.js';
import { CategorySlugVO } from '../value-objects/primitives/category-slug.vo.js';
import { CategoryIdVO } from '../value-objects/primitives/category-id.vo.js';

export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');

export interface CategoryTreeNode {
  readonly category: CategoryEntity;
  readonly children: readonly CategoryTreeNode[];
}

export interface CategoryRepository extends BaseRepository<CategoryEntity, string> {
  findByIdVO(id: CategoryIdVO): Promise<CategoryEntity | null>;
  findBySlug(slug: CategorySlugVO): Promise<CategoryEntity | null>;
  existsBySlug(slug: CategorySlugVO): Promise<boolean>;
  findRoots(): Promise<readonly CategoryEntity[]>;
  findByParentId(parentId: CategoryIdVO): Promise<readonly CategoryEntity[]>;
  findChildren(parentId: CategoryIdVO): Promise<readonly CategoryEntity[]>;
  hasChildren(categoryId: CategoryIdVO): Promise<boolean>;
  findDescendants(categoryId: CategoryIdVO): Promise<readonly CategoryEntity[]>;
  findAncestors(categoryId: CategoryIdVO): Promise<readonly CategoryEntity[]>;
  findTree(): Promise<readonly CategoryTreeNode[]>;
  findActive(): Promise<readonly CategoryEntity[]>;
  findByPath(path: readonly string[]): Promise<readonly CategoryEntity[]>;
  findByIds(ids: readonly string[]): Promise<readonly CategoryEntity[]>;
}
