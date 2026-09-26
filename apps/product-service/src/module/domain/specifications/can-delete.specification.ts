import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ProductEntity } from '../entities/product.entity';

export class CanDeleteSpecification extends Specification<ProductEntity> {
  isSatisfiedBy(candidate: ProductEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.isPublished()) return false;
    return true;
  }
}
