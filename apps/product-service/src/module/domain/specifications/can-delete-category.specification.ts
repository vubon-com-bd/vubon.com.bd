/**
 * CanDeleteCategory Specification
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { CategoryEntity } from '../entities/category.entity.js';

export class CanDeleteCategorySpecification extends Specification<CategoryEntity> {
  isSatisfiedBy(category: CategoryEntity): boolean {
    if (category.isDeleted()) return false;
    if (category.hasChildren) return false;
    if (category.productCount > 0) return false;
    return true;
  }

  reason(category: CategoryEntity): string | undefined {
    if (category.isDeleted()) return 'already deleted';
    if (category.hasChildren) return 'category has children';
    if (category.productCount > 0) return 'category has products';
    return undefined;
  }
}
