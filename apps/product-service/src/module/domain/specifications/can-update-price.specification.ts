/**
 * CanUpdatePriceSpecification
 * @module product-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { PRICING } from '@vubon/shared-constants/business';
import type { ProductEntity } from '../entities/product.entity.js';

export interface UpdatePriceContext {
  readonly newPrice: number;
  readonly costPrice?: number;
  readonly actorRole?: 'admin' | 'vendor' | 'staff';
  readonly bypassMinMargin?: boolean;
}

export interface UpdatePriceCandidate {
  readonly product: ProductEntity;
  readonly ctx: UpdatePriceContext;
}

const MIN_HEALTHY_MARGIN_PERCENT = 5;

export class CanUpdatePriceSpecification extends Specification<UpdatePriceCandidate> {
  isSatisfiedBy(c: UpdatePriceCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: UpdatePriceCandidate): string | null {
    const { product, ctx } = c;

    if (product.status.isDeleted() || product.status.isArchived()) {
      return `product is ${product.status.value} — cannot update price`;
    }

    if (!Number.isFinite(ctx.newPrice) || ctx.newPrice < PRICING.MIN_PRICE) {
      return `new price must be >= ${PRICING.MIN_PRICE}`;
    }
    if (ctx.newPrice > PRICING.MAX_PRICE) {
      return `new price exceeds max ${PRICING.MAX_PRICE}`;
    }

    if (ctx.costPrice !== undefined && ctx.costPrice > 0) {
      const marginPercent = ((ctx.newPrice - ctx.costPrice) / ctx.costPrice) * 100;
      if (marginPercent < 0) {
        return `new price (${ctx.newPrice}) is below cost (${ctx.costPrice})`;
      }
      if (
        marginPercent < MIN_HEALTHY_MARGIN_PERCENT &&
        !ctx.bypassMinMargin &&
        ctx.actorRole !== 'admin'
      ) {
        return `margin ${marginPercent.toFixed(2)}% below minimum ${MIN_HEALTHY_MARGIN_PERCENT}%`;
      }
    }

    return null;
  }

  static default(): CanUpdatePriceSpecification {
    return new CanUpdatePriceSpecification();
  }
}
