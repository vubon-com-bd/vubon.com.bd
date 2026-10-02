/**
 * CanPublishProduct Specification
 * @module product-service/domain/specifications
 *
 * Encapsulates all business rules for publishing a product.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ProductEntity } from '../entities/product.entity.js';
import { PRODUCT_STATUS } from '@vubon/shared-constants/business/product';

export interface PublishCheckResult {
  readonly allowed: boolean;
  readonly reason?: string;
}

export class CanPublishProductSpecification extends Specification<ProductEntity> {
  isSatisfiedBy(product: ProductEntity): boolean {
    return this.check(product).allowed;
  }

  check(product: ProductEntity): PublishCheckResult {
    if (product.isDeleted()) {
      return { allowed: false, reason: 'product is deleted' };
    }
    if (product.status.value === PRODUCT_STATUS.PUBLISHED) {
      return { allowed: false, reason: 'product is already published' };
    }
    if (product.status.value === PRODUCT_STATUS.ARCHIVED) {
      return { allowed: false, reason: 'product is archived' };
    }
    if (product.description.isEmpty) {
      return { allowed: false, reason: 'description is required' };
    }
    if (product.price.amount <= 0) {
      return { allowed: false, reason: 'price must be greater than zero' };
    }
    if (product.type.requiresShipping() && product.totalStock <= 0) {
      return { allowed: false, reason: 'physical product requires positive stock' };
    }
    if (product.images.length === 0 && !product.thumbnailUrl) {
      return { allowed: false, reason: 'at least one image is required' };
    }
    if (!product.status.canTransitionTo(PRODUCT_STATUS.PUBLISHED)) {
      return {
        allowed: false,
        reason: `cannot transition from "${product.status.value}" to published`,
      };
    }
    return { allowed: true };
  }
}
