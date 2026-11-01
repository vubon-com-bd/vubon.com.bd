/**
 * VendorReturnPolicyVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর return/refund policy।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_RETURN_POLICY } from '@vubon/shared-constants/business';

import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { ReturnPolicyTypeVO } from '../primitives/return-policy-type.vo.js';

export interface VendorReturnPolicyVOProps {
  readonly vendorId: VendorIdVO;
  readonly type: ReturnPolicyTypeVO;
  readonly windowDays: number;
  readonly isFreeReturn: boolean;
  readonly restockFeePercent: number;
  readonly requireReason: boolean;
  readonly requireImages: boolean;
  readonly maxImages: number;
  readonly autoApprove: boolean;
  readonly approvalSlaHours: number;
  readonly excludedCategories: readonly string[];
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorReturnPolicyVO extends BaseVO<VendorReturnPolicyVOProps> {
  private constructor(props: VendorReturnPolicyVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorReturnPolicyVOProps): VendorReturnPolicyVO {
    const vo = new VendorReturnPolicyVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorReturnPolicyVOProps): VendorReturnPolicyVO {
    return new VendorReturnPolicyVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!Number.isInteger(v.windowDays) || v.windowDays < VENDOR_RETURN_POLICY.MIN_WINDOW_DAYS) {
      throw new ValidationError(
        `windowDays must be at least ${VENDOR_RETURN_POLICY.MIN_WINDOW_DAYS}`,
        'windowDays',
      );
    }
    if (v.windowDays > VENDOR_RETURN_POLICY.MAX_WINDOW_DAYS) {
      throw new ValidationError(
        `windowDays cannot exceed ${VENDOR_RETURN_POLICY.MAX_WINDOW_DAYS}`,
        'windowDays',
      );
    }

    if (v.restockFeePercent < 0 || v.restockFeePercent > 100) {
      throw new ValidationError('restockFeePercent must be between 0 and 100', 'restockFeePercent');
    }

    if (!Number.isInteger(v.maxImages) || v.maxImages < 0) {
      throw new ValidationError('maxImages must be non-negative integer', 'maxImages');
    }
    if (v.maxImages > VENDOR_RETURN_POLICY.MAX_IMAGES) {
      throw new ValidationError(
        `maxImages cannot exceed ${VENDOR_RETURN_POLICY.MAX_IMAGES}`,
        'maxImages',
      );
    }

    if (!Number.isInteger(v.approvalSlaHours) || v.approvalSlaHours < 1) {
      throw new ValidationError('approvalSlaHours must be positive integer', 'approvalSlaHours');
    }

    if (v.notes && v.notes.length > 1000) {
      throw new ValidationError('notes max 1000 chars', 'notes');
    }

    // Business rules
    if (v.type.isNoReturn() && v.windowDays > 0) {
      throw new ValidationError('no_return policy must have windowDays = 0', 'windowDays');
    }
    if (!v.type.isNoReturn() && v.windowDays === 0) {
      throw new ValidationError(`${v.type.value} policy must have windowDays > 0`, 'windowDays');
    }
    if (v.isFreeReturn && v.restockFeePercent > 0) {
      throw new ValidationError('free return cannot have restockFeePercent > 0', 'restockFeePercent');
    }
    if (v.requireImages && v.maxImages === 0) {
      throw new ValidationError('requireImages=true needs maxImages > 0', 'maxImages');
    }
  }

  // ─── Getters ───
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get type(): ReturnPolicyTypeVO { return this.value.type; }
  get windowDays(): number { return this.value.windowDays; }
  get isFreeReturn(): boolean { return this.value.isFreeReturn; }
  get restockFeePercent(): number { return this.value.restockFeePercent; }
  get requireReason(): boolean { return this.value.requireReason; }
  get requireImages(): boolean { return this.value.requireImages; }
  get maxImages(): number { return this.value.maxImages; }
  get autoApprove(): boolean { return this.value.autoApprove; }
  get approvalSlaHours(): number { return this.value.approvalSlaHours; }
  get excludedCategories(): readonly string[] { return this.value.excludedCategories; }
  get notes(): string | undefined { return this.value.notes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isNoReturn(): boolean { return this.type.isNoReturn(); }
  isFullReturn(): boolean { return this.type.isFullReturn(); }
  isExchangeOnly(): boolean { return this.type.isExchangeOnly(); }
  isPartialReturn(): boolean { return this.type.isPartialReturn(); }
  isConditional(): boolean { return this.type.isConditional(); }

  allowsReturn(): boolean { return this.type.allowsReturn(); }
  issuesRefund(): boolean { return this.type.issuesRefund(); }

  hasExcludedCategories(): boolean { return this.excludedCategories.length > 0; }
  hasNotes(): boolean { return this.notes !== undefined; }
  hasRestockFee(): boolean { return this.restockFeePercent > 0; }

  isCategoryExcluded(categoryId: string): boolean {
    return this.excludedCategories.includes(categoryId);
  }

  /** Whether a return can be initiated within N days of purchase */
  isWithinWindow(daysSincePurchase: number): boolean {
    if (!this.allowsReturn()) return false;
    return daysSincePurchase >= 0 && daysSincePurchase <= this.windowDays;
  }

  /** Whether return requires human approval */
  requiresApproval(): boolean {
    return !this.autoApprove;
  }

  /**
   * Calculate refund for a returned order.
   */
  calculateRefund(orderAmount: number): number {
    if (orderAmount < 0) {
      throw new ValidationError('orderAmount must be non-negative', 'orderAmount');
    }
    if (!this.allowsReturn()) return 0;
    const restock = (orderAmount * this.restockFeePercent) / 100;
    return Math.round((orderAmount - restock) * 100) / 100;
  }

  /** Max window in human-readable form */
  get windowLabel(): string {
    if (this.windowDays === 0) return 'No returns accepted';
    if (this.windowDays === 1) return '1 day';
    if (this.windowDays === 7) return '7 days (1 week)';
    if (this.windowDays === 30) return '30 days';
    return `${this.windowDays} days`;
  }
}
