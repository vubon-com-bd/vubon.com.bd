/**
 * ProductEligibilityService — Real business logic
 * @module product-service/domain/services
 *
 * Rules for whether a product can be:
 *  - Published
 *  - Deleted
 *  - Featured
 *  - Indexed in search
 */
import type { ProductEntity } from '../entities/product.entity.js';

export interface EligibilityResult {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
}

export interface SearchEligibilityInput {
  readonly status: string;
  readonly isPublished: boolean;
  readonly totalStock: number;
  readonly hasImages: boolean;
  readonly hasName: boolean;
}

export class ProductEligibilityService {
  /**
   * Product publish করা যায় কিনা।
   */
  static canPublish(product: ProductEntity): EligibilityResult {
    const reasons: string[] = [];
    const vo = product.vo;

    if (!product.status.isApproved() && !product.status.isOutOfStock()) {
      reasons.push(`status "${product.status.value}" is not publishable`);
    }
    if (vo.totalStock <= 0) {
      reasons.push('total stock is zero');
    }
    if (!vo.hasImages()) {
      reasons.push('no images available');
    }
    if (vo.name.value.trim().length === 0) {
      reasons.push('name is empty');
    }
    if (vo.categoryId === undefined) {
      reasons.push('category is missing');
    }

    return { eligible: reasons.length === 0, reasons };
  }

  /**
   * Product delete করা যায় কিনা।
   */
  static canDelete(product: ProductEntity): EligibilityResult {
    const reasons: string[] = [];

    if (product.status.isPublished()) {
      reasons.push('product is published — unpublish first');
    }
    if (product.status.isDeleted()) {
      reasons.push('product is already deleted');
    }

    return { eligible: reasons.length === 0, reasons };
  }

  /**
   * Product feature (homepage/banner) করা যায় কিনা।
   */
  static canFeature(product: ProductEntity): EligibilityResult {
    const reasons: string[] = [];
    const vo = product.vo;

    if (!product.status.isPublished()) {
      reasons.push('product is not published');
    }
    if (vo.totalStock <= 0) {
      reasons.push('no stock available');
    }
    if (!vo.thumbnailUrl) {
      reasons.push('no thumbnail for featured view');
    }

    return { eligible: reasons.length === 0, reasons };
  }

  /**
   * Search index-এ include করা হবে কিনা।
   */
  static isSearchEligible(input: SearchEligibilityInput): boolean {
    if (!input.isPublished) return false;
    if (input.status === 'deleted' || input.status === 'archived') return false;
    if (input.totalStock <= 0) return false;
    if (!input.hasName) return false;
    return true;
  }

  /**
   * Product edit করা যায় কিনা (status-gated)।
   */
  static canEdit(product: ProductEntity): EligibilityResult {
    const reasons: string[] = [];
    if (!product.status.isEditable()) {
      reasons.push(`status "${product.status.value}" is not editable`);
    }
    return { eligible: reasons.length === 0, reasons };
  }

  /**
   * Product কে order এ যুক্ত করা যায় কিনা।
   */
  static canBeOrdered(product: ProductEntity, requestedQty: number): EligibilityResult {
    const reasons: string[] = [];

    if (!product.status.isPublished() && !product.status.isOutOfStock()) {
      reasons.push(`status "${product.status.value}" is not orderable`);
    }
    if (requestedQty <= 0) {
      reasons.push('requested quantity must be positive');
    }
    if (product.vo.totalStock < requestedQty) {
      reasons.push(`only ${product.vo.totalStock} units available`);
    }

    return { eligible: reasons.length === 0, reasons };
  }
}
