import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ProductEntity } from '../entities/product.entity';

export class CanUpdatePriceSpecification extends Specification<ProductEntity> {
  isSatisfiedBy(candidate: ProductEntity): boolean {
    if (candidate.isDeleted()) return false;
    return true;
  }
}
