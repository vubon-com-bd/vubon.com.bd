import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ProductEntity } from '../entities/product.entity';

const MAX_VARIANTS = 50;

export class CanAddVariantSpecification extends Specification<ProductEntity> {
  constructor(private readonly currentCount: number) {
    super();
  }

  isSatisfiedBy(candidate: ProductEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.isArchived()) return false;
    return this.currentCount < MAX_VARIANTS;
  }
}
