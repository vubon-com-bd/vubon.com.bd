/**
 * CanArchiveProduct Specification
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ProductEntity } from '../entities/product.entity.js';
import { PRODUCT_STATUS } from '@vubon/shared-constants/business/product';

export class CanArchiveProductSpecification extends Specification<ProductEntity> {
  isSatisfiedBy(product: ProductEntity): boolean {
    if (product.isDeleted()) return false;
    if (product.status.value === PRODUCT_STATUS.ARCHIVED) return false;
    if (product.status.value === PRODUCT_STATUS.DISCONTINUED) return false;
    return true;
  }

  reason(product: ProductEntity): string | undefined {
    if (product.isDeleted()) return 'product is deleted';
    if (product.status.value === PRODUCT_STATUS.ARCHIVED) return 'already archived';
    if (product.status.value === PRODUCT_STATUS.DISCONTINUED) return 'discontinued';
    return undefined;
  }
}
