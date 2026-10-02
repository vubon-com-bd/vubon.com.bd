/**
 * CanTransitionStatus Specification
 * Checks allowed status transitions for a product.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ProductEntity } from '../entities/product.entity.js';

export class CanTransitionStatusSpecification extends Specification<ProductEntity> {
  constructor(private readonly targetStatus: string) {
    super();
  }

  isSatisfiedBy(product: ProductEntity): boolean {
    if (product.isDeleted()) return false;
    return product.status.canTransitionTo(this.targetStatus);
  }
}
