/**
 * VendorWarrantyVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর product warranty configuration।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_WARRANTY } from '@vubon/shared-constants/business';

import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { WarrantyTypeVO } from '../primitives/warranty-type.vo.js';

export interface VendorWarrantyVOProps {
  readonly vendorId: VendorIdVO;
  readonly type: WarrantyTypeVO;
  readonly periodDays: number;
  readonly requireProof: boolean;
  readonly coverShipping: boolean;
  readonly autoRegister: boolean;
  readonly excludedCategories: readonly string[];
  readonly terms?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorWarrantyVO extends BaseVO<VendorWarrantyVOProps> {
  private constructor(props: VendorWarrantyVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorWarrantyVOProps): VendorWarrantyVO {
    const vo = new VendorWarrantyVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorWarrantyVOProps): VendorWarrantyVO {
    return new VendorWarrantyVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!Number.isInteger(v.periodDays) || v.periodDays < 0) {
      throw new ValidationError('periodDays must be non-negative integer', 'periodDays');
    }
    if (v.periodDays > VENDOR_WARRANTY.MAX_PERIOD_DAYS) {
      throw new ValidationError(
        `periodDays cannot exceed ${VENDOR_WARRANTY.MAX_PERIOD_DAYS}`,
        'periodDays',
      );
    }

    if (v.terms && v.terms.length > 5000) {
      throw new ValidationError('terms max 5000 chars', 'terms');
    }

    // Business rule: "none" type must have 0 days
    if (v.type.isNone() && v.periodDays > 0) {
      throw new ValidationError('warranty type "none" must have periodDays = 0', 'periodDays');
    }
    if (!v.type.isNone() && v.periodDays === 0) {
      throw new ValidationError(`warranty type "${v.type.value}" requires periodDays > 0`, 'periodDays');
    }

    // coverShipping not allowed for none
    if (v.type.isNone() && v.coverShipping) {
      throw new ValidationError('warranty "none" cannot cover shipping', 'coverShipping');
    }
  }

  // ─── Getters ───
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get type(): WarrantyTypeVO { return this.value.type; }
  get periodDays(): number { return this.value.periodDays; }
  get requireProof(): boolean { return this.value.requireProof; }
  get coverShipping(): boolean { return this.value.coverShipping; }
  get autoRegister(): boolean { return this.value.autoRegister; }
  get excludedCategories(): readonly string[] { return this.value.excludedCategories; }
  get terms(): string | undefined { return this.value.terms; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isNone(): boolean { return this.type.isNone(); }
  isManufacturer(): boolean { return this.type.isManufacturer(); }
  isSeller(): boolean { return this.type.isSeller(); }
  isExtended(): boolean { return this.type.isExtended(); }
  isInternational(): boolean { return this.type.isInternational(); }
  isLimited(): boolean { return this.type.isLimited(); }

  providesCoverage(): boolean { return this.type.providesCoverage(); }
  isSellerBacked(): boolean { return this.type.isSellerBacked(); }
  isManufacturerBacked(): boolean { return this.type.isManufacturerBacked(); }
  hasLimitations(): boolean { return this.type.hasLimitations(); }

  hasTerms(): boolean { return this.terms !== undefined; }
  hasExcludedCategories(): boolean { return this.excludedCategories.length > 0; }

  /** Period in months (approx) */
  get periodMonths(): number {
    return Math.round((this.periodDays / 30) * 10) / 10;
  }

  /** Period in years (approx, 2 decimals) */
  get periodYears(): number {
    return Math.round((this.periodDays / 365) * 100) / 100;
  }

  /** Human-readable period */
  get periodLabel(): string {
    if (this.periodDays === 0) return 'No warranty';
    if (this.periodDays < 30) return `${this.periodDays} days`;
    if (this.periodDays === 30) return '1 month';
    if (this.periodDays === 90) return '3 months';
    if (this.periodDays === 180) return '6 months';
    if (this.periodDays === 365) return '1 year';
    if (this.periodDays === 730) return '2 years';
    if (this.periodDays === 1095) return '3 years';
    if (this.periodDays === 1825) return '5 years';
    return `${this.periodDays} days`;
  }

  isCategoryExcluded(categoryId: string): boolean {
    return this.excludedCategories.includes(categoryId);
  }

  /** Whether warranty is still valid after N days */
  isWithinWarranty(daysSincePurchase: number): boolean {
    if (!this.providesCoverage()) return false;
    return daysSincePurchase >= 0 && daysSincePurchase <= this.periodDays;
  }

  /** Days remaining in warranty */
  getRemainingDays(daysSincePurchase: number): number {
    if (!this.providesCoverage()) return 0;
    return Math.max(0, this.periodDays - daysSincePurchase);
  }

  /** Warranty expires within N days */
  isExpiringSoon(daysSincePurchase: number, threshold = 30): boolean {
    const remaining = this.getRemainingDays(daysSincePurchase);
    return remaining > 0 && remaining <= threshold;
  }
}
