import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ProductEntity } from '../entities/product.entity';

export class CanUpdateInventorySpecification extends Specification<ProductEntity> {
  isSatisfiedBy(candidate: ProductEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.isArchived()) return false;
    return true;
  }
}
