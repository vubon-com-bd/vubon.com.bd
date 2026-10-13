/**
 * CanAddVariantSpecification
 * @module product-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VARIANT } from '@vubon/shared-constants/business';
import type { ProductEntity } from '../entities/product.entity.js';

export interface AddVariantContext {
  readonly currentVariantCount: number;
  readonly proposedSku: string;
  readonly existingSkus?: readonly string[];
}

export interface AddVariantCandidate {
  readonly product: ProductEntity;
  readonly ctx: AddVariantContext;
}

export class CanAddVariantSpecification extends Specification<AddVariantCandidate> {
  isSatisfiedBy(c: AddVariantCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: AddVariantCandidate): string | null {
    const { product, ctx } = c;

    if (product.status.isDeleted() || product.status.isArchived()) {
      return `product is ${product.status.value} — cannot add variants`;
    }

    if (ctx.currentVariantCount >= VARIANT.MAX_VARIANTS_PER_PRODUCT) {
      return `variant limit reached (${VARIANT.MAX_VARIANTS_PER_PRODUCT})`;
    }

    if (!ctx.proposedSku || ctx.proposedSku.trim().length === 0) {
      return 'proposed variant sku is empty';
    }

    if (ctx.existingSkus?.includes(ctx.proposedSku)) {
      return `variant sku "${ctx.proposedSku}" already exists`;
    }

    if (product.vo.type.isSimple()) {
      return 'simple products cannot have variants — change product type first';
    }

    return null;
  }

  static default(): CanAddVariantSpecification {
    return new CanAddVariantSpecification();
  }
}
