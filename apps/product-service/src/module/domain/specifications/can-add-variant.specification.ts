/**
 * CanAddVariant Specification
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ProductEntity } from '../entities/product.entity.js';
import { VARIANT } from '@vubon/shared-constants/business/product';

export class CanAddVariantSpecification extends Specification<ProductEntity> {
  isSatisfiedBy(product: ProductEntity): boolean {
    if (product.isDeleted()) return false;
    if (product.variantCount() >= VARIANT.MAX_VARIANTS_PER_PRODUCT) return false;
    return true;
  }

  remaining(product: ProductEntity): number {
    return Math.max(0, VARIANT.MAX_VARIANTS_PER_PRODUCT - product.variantCount());
  }
}
