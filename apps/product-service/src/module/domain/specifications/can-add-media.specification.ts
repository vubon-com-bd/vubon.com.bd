/**
 * CanAddMedia Specification
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ProductEntity } from '../entities/product.entity.js';

const MAX_IMAGES_PER_PRODUCT = 20;

export class CanAddMediaSpecification extends Specification<ProductEntity> {
  isSatisfiedBy(product: ProductEntity): boolean {
    if (product.isDeleted()) return false;
    if (product.images.length >= MAX_IMAGES_PER_PRODUCT) return false;
    return true;
  }

  remaining(product: ProductEntity): number {
    return Math.max(0, MAX_IMAGES_PER_PRODUCT - product.images.length);
  }
}
