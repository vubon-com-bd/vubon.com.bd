/**
 * VendorReviewStatus Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_REVIEW_STATUS } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_REVIEW_STATUS) as readonly string[];

export class VendorReviewStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): VendorReviewStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid review status "${raw}"`, 'status');
    }
    return new VendorReviewStatusVO(raw);
  }

  static pending(): VendorReviewStatusVO { return new VendorReviewStatusVO(VENDOR_REVIEW_STATUS.PENDING); }
  static approved(): VendorReviewStatusVO { return new VendorReviewStatusVO(VENDOR_REVIEW_STATUS.APPROVED); }
  static rejected(): VendorReviewStatusVO { return new VendorReviewStatusVO(VENDOR_REVIEW_STATUS.REJECTED); }
  static flagged(): VendorReviewStatusVO { return new VendorReviewStatusVO(VENDOR_REVIEW_STATUS.FLAGGED); }
  static hidden(): VendorReviewStatusVO { return new VendorReviewStatusVO(VENDOR_REVIEW_STATUS.HIDDEN); }

  static reconstitute(raw: string): VendorReviewStatusVO { return new VendorReviewStatusVO(raw); }

  isPending(): boolean { return this.value === VENDOR_REVIEW_STATUS.PENDING; }
  isApproved(): boolean { return this.value === VENDOR_REVIEW_STATUS.APPROVED; }
  isRejected(): boolean { return this.value === VENDOR_REVIEW_STATUS.REJECTED; }
  isFlagged(): boolean { return this.value === VENDOR_REVIEW_STATUS.FLAGGED; }
  isHidden(): boolean { return this.value === VENDOR_REVIEW_STATUS.HIDDEN; }

  /** Visible on vendor's public page? */
  isPubliclyVisible(): boolean { return this.isApproved(); }

  canTransitionTo(target: string): boolean {
    const t: Record<string, readonly string[]> = {
      [VENDOR_REVIEW_STATUS.PENDING]: [VENDOR_REVIEW_STATUS.APPROVED, VENDOR_REVIEW_STATUS.REJECTED, VENDOR_REVIEW_STATUS.FLAGGED],
      [VENDOR_REVIEW_STATUS.APPROVED]: [VENDOR_REVIEW_STATUS.FLAGGED, VENDOR_REVIEW_STATUS.HIDDEN],
      [VENDOR_REVIEW_STATUS.FLAGGED]: [VENDOR_REVIEW_STATUS.APPROVED, VENDOR_REVIEW_STATUS.HIDDEN, VENDOR_REVIEW_STATUS.REJECTED],
      [VENDOR_REVIEW_STATUS.HIDDEN]: [VENDOR_REVIEW_STATUS.APPROVED],
      [VENDOR_REVIEW_STATUS.REJECTED]: [],
    };
    return (t[this.value] ?? []).includes(target);
  }
}
