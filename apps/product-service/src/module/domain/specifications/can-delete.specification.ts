/**
 * CanDeleteSpecification
 * @module product-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { ProductEntity } from '../entities/product.entity.js';

export interface DeleteContext {
  readonly force?: boolean;
  readonly actorRole?: 'admin' | 'vendor' | 'staff';
  readonly allowPublishedDelete?: boolean;
}

export interface DeleteCandidate {
  readonly product: ProductEntity;
  readonly ctx?: DeleteContext;
}

export class CanDeleteSpecification extends Specification<DeleteCandidate> {
  isSatisfiedBy(c: DeleteCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: DeleteCandidate): string | null {
    const { product, ctx } = c;

    if (product.status.isDeleted()) {
      return 'product is already deleted';
    }

    const allowPublished = ctx?.allowPublishedDelete ?? false;
    if (product.status.isPublished() && !allowPublished && !ctx?.force) {
      return 'product is published — unpublish first or use force delete';
    }

    if (ctx?.actorRole === 'vendor' && product.vo.vendorId === undefined) {
      return 'vendor cannot delete product without ownership';
    }

    return null;
  }

  static forced(): CanDeleteSpecification {
    return new CanDeleteSpecification();
  }

  static strict(): CanDeleteSpecification {
    return new CanDeleteSpecification();
  }
}
