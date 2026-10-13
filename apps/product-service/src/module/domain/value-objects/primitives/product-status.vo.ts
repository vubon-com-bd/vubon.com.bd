/**
 * ProductStatus Value Object
 * @module product-service/domain/value-objects/primitives
 *
 * State machine:
 *   draft → pending → approved → published
 *   draft/pending → rejected
 *   published → out_of_stock | discontinued | archived
 *   * → deleted (except published without unpublish)
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PRODUCT_STATUS } from '@vubon/shared-constants/business';

export type ProductStatusValue =
  (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(PRODUCT_STATUS);

const VALID_TRANSITIONS: Readonly<Record<ProductStatusValue, readonly ProductStatusValue[]>> = {
  draft: ['pending', 'deleted'],
  pending: ['approved', 'rejected', 'draft', 'deleted'],
  approved: ['published', 'rejected', 'deleted'],
  published: ['out_of_stock', 'discontinued', 'archived'],
  rejected: ['draft', 'deleted'],
  out_of_stock: ['published', 'discontinued', 'archived'],
  discontinued: ['archived'],
  archived: ['deleted'],
  deleted: [],
};

export class ProductStatusVO extends BaseStatusVO<ProductStatusValue> {
  private constructor(value: ProductStatusValue) { super(value); }

  static create(raw: string): ProductStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ProductStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ProductStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new ProductStatusVO(normalized as ProductStatusValue);
  }

  static reconstitute(raw: string): ProductStatusVO {
    return new ProductStatusVO(raw as ProductStatusValue);
  }

  static draft(): ProductStatusVO { return new ProductStatusVO('draft'); }
  static pending(): ProductStatusVO { return new ProductStatusVO('pending'); }
  static approved(): ProductStatusVO { return new ProductStatusVO('approved'); }
  static published(): ProductStatusVO { return new ProductStatusVO('published'); }
  static rejected(): ProductStatusVO { return new ProductStatusVO('rejected'); }
  static outOfStock(): ProductStatusVO { return new ProductStatusVO('out_of_stock'); }
  static discontinued(): ProductStatusVO { return new ProductStatusVO('discontinued'); }
  static archived(): ProductStatusVO { return new ProductStatusVO('archived'); }
  static deleted(): ProductStatusVO { return new ProductStatusVO('deleted'); }

  // Predicates
  isDraft(): boolean { return this.value === 'draft'; }
  isPending(): boolean { return this.value === 'pending'; }
  isApproved(): boolean { return this.value === 'approved'; }
  isPublished(): boolean { return this.value === 'published'; }
  isRejected(): boolean { return this.value === 'rejected'; }
  isOutOfStock(): boolean { return this.value === 'out_of_stock'; }
  isDiscontinued(): boolean { return this.value === 'discontinued'; }
  isArchived(): boolean { return this.value === 'archived'; }
  isDeleted(): boolean { return this.value === 'deleted'; }

  isVisible(): boolean {
    return this.isPublished() || this.isOutOfStock();
  }

  isEditable(): boolean {
    return !this.isDeleted() && !this.isArchived();
  }

  isFinal(): boolean {
    return this.isDeleted() || this.isArchived() || this.isDiscontinued();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as ProductStatusValue);
  }
}
