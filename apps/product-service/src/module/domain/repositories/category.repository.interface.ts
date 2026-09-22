import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryIdVO } from '../value-objects/primitives/category-id.vo';
import { CategorySlugVO } from '../value-objects/primitives/category-slug.vo';

export interface CategoryRepository
  extends BaseRepository<CategoryEntity, CategoryIdVO> {
  findBySlug(slug: CategorySlugVO): Promise<CategoryEntity | null>;
  existsBySlug(slug: CategorySlugVO): Promise<boolean>;
  findRoots(): Promise<readonly CategoryEntity[]>;
  findByParent(parentId: CategoryIdVO): Promise<readonly CategoryEntity[]>;
  findDescendants(categoryId: CategoryIdVO): Promise<readonly CategoryEntity[]>;
}
