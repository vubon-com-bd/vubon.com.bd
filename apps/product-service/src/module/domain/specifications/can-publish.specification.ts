/**
 * CanPublishSpecification
 * @module product-service/domain/specifications
 *
 * Business rules — product publish করার আগে যাচাই।
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { ProductEntity } from '../entities/product.entity.js';

export interface PublishContext {
  readonly requireImages?: boolean;
  readonly requireStock?: boolean;
  readonly minStockThreshold?: number;
}

export interface PublishCandidate {
  readonly product: ProductEntity;
  readonly ctx?: PublishContext;
}

export class CanPublishSpecification extends Specification<PublishCandidate> {
  isSatisfiedBy(c: PublishCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: PublishCandidate): string | null {
    const { product, ctx } = c;

    if (product.status.isDeleted()) {
      return `product is deleted`;
    }
    if (product.status.isPublished()) {
      return 'product is already published';
    }
    if (!product.status.isApproved() && !product.status.isOutOfStock()) {
      return `status "${product.status.value}" is not publishable`;
    }

    const requireImages = ctx?.requireImages ?? true;
    const requireStock = ctx?.requireStock ?? true;
    const minStock = ctx?.minStockThreshold ?? 1;

    if (requireImages && !product.vo.hasImages()) {
      return 'product has no images';
    }
    if (requireStock && product.vo.totalStock < minStock) {
      return `product stock (${product.vo.totalStock}) below minimum (${minStock})`;
    }
    if (product.vo.name.value.trim().length === 0) {
      return 'product name is empty';
    }

    return null;
  }

  static strict(): CanPublishSpecification {
    return new CanPublishSpecification();
  }

  static relaxed(): CanPublishSpecification {
    return new CanPublishSpecification();
  }
}
