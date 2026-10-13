/**
 * CanUpdateSpecification
 * @module product-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { ProductEntity } from '../entities/product.entity.js';

export interface UpdateContext {
  readonly fields?: readonly string[];
  readonly actorId?: string;
  readonly actorRole?: 'admin' | 'vendor' | 'staff';
}

export interface UpdateCandidate {
  readonly product: ProductEntity;
  readonly ctx?: UpdateContext;
}

export class CanUpdateSpecification extends Specification<UpdateCandidate> {
  isSatisfiedBy(c: UpdateCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: UpdateCandidate): string | null {
    const { product, ctx } = c;

    if (product.status.isDeleted()) {
      return 'product is deleted and cannot be updated';
    }
    if (product.status.isArchived()) {
      return 'product is archived and cannot be updated';
    }
    if (!product.status.isEditable()) {
      return `status "${product.status.value}" is not editable`;
    }

    if (ctx?.actorRole === 'vendor' && product.vo.vendorId === undefined) {
      return 'vendor cannot update product without vendor ownership';
    }

    if (ctx?.fields && ctx.fields.length === 0) {
      return 'no fields provided for update';
    }

    return null;
  }

  static vendorContext(): CanUpdateSpecification {
    return new CanUpdateSpecification();
  }

  static adminContext(): CanUpdateSpecification {
    return new CanUpdateSpecification();
  }
}
