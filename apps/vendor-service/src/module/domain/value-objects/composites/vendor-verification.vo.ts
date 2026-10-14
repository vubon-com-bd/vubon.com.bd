/**
 * VendorVerificationVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর একটি verification record (email/phone/document/etc.)।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_VERIFICATION } from '@vubon/shared-constants/business';

import { VerificationIdVO } from '../primitives/verification-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { VerificationStatusVO } from '../primitives/verification-status.vo.js';

export type VerificationType =
  | 'email'
  | 'phone'
  | 'business_license'
  | 'tax_id'
  | 'bank_account'
  | 'identity'
  | 'address'
  | 'website';

const VALID_TYPES = new Set<string>([
  'email',
  'phone',
  'business_license',
  'tax_id',
  'bank_account',
  'identity',
  'address',
  'website',
]);

export interface VendorVerificationVOProps {
  readonly id: VerificationIdVO;
  readonly vendorId: VendorIdVO;
  readonly type: VerificationType;
  readonly status: VerificationStatusVO;
  readonly referenceId?: string;
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly reviewedBy?: string;
  readonly expiresAt?: string;
  readonly rejectionReason?: string;
  readonly attempts: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorVerificationVO extends BaseVO<VendorVerificationVOProps> {
  private constructor(props: VendorVerificationVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorVerificationVOProps): VendorVerificationVO {
    const vo = new VendorVerificationVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorVerificationVOProps): VendorVerificationVO {
    return new VendorVerificationVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!VALID_TYPES.has(v.type)) {
      throw new ValidationError(`Invalid verification type: "${v.type}"`, 'type');
    }

    if (!Number.isInteger(v.attempts) || v.attempts < 0) {
      throw new ValidationError('attempts must be a non-negative integer', 'attempts');
    }
    if (v.attempts > 10) {
      throw new ValidationError('attempts cannot exceed 10', 'attempts');
    }

    if (v.status.isApproved() && !v.reviewedAt) {
      throw new ValidationError('Approved verification must have reviewedAt', 'reviewedAt');
    }
    if (v.status.isRejected() && !v.rejectionReason) {
      throw new ValidationError('Rejected verification must have rejectionReason', 'rejectionReason');
    }

    if (v.submittedAt && v.reviewedAt) {
      if (new Date(v.submittedAt) > new Date(v.reviewedAt)) {
        throw new ValidationError('submittedAt must be before reviewedAt', 'reviewedAt');
      }
    }
  }

  // ─── Getters ───
  get id(): VerificationIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get type(): VerificationType { return this.value.type; }
  get status(): VerificationStatusVO { return this.value.status; }
  get referenceId(): string | undefined { return this.value.referenceId; }
  get submittedAt(): string { return this.value.submittedAt; }
  get reviewedAt(): string | undefined { return this.value.reviewedAt; }
  get reviewedBy(): string | undefined { return this.value.reviewedBy; }
  get expiresAt(): string | undefined { return this.value.expiresAt; }
  get rejectionReason(): string | undefined { return this.value.rejectionReason; }
  get attempts(): number { return this.value.attempts; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isEmail(): boolean { return this.type === 'email'; }
  isPhone(): boolean { return this.type === 'phone'; }
  isBusinessLicense(): boolean { return this.type === 'business_license'; }
  isTaxId(): boolean { return this.type === 'tax_id'; }
  isBankAccount(): boolean { return this.type === 'bank_account'; }
  isIdentity(): boolean { return this.type === 'identity'; }
  isAddress(): boolean { return this.type === 'address'; }
  isWebsite(): boolean { return this.type === 'website'; }

  isNotStarted(): boolean { return this.status.isNotStarted(); }
  isPending(): boolean { return this.status.isPending(); }
  isInReview(): boolean { return this.status.isInReview(); }
  isApproved(): boolean { return this.status.isApproved(); }
  isRejected(): boolean { return this.status.isRejected(); }
  isExpired(): boolean { return this.status.isExpired(); }

  hasReference(): boolean { return this.referenceId !== undefined; }
  hasExpiry(): boolean { return this.expiresAt !== undefined; }

  /** Days until expiry */
  get daysUntilExpiry(): number | null {
    if (!this.expiresAt) return null;
    const diff = new Date(this.expiresAt).getTime() - Date.now();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /** Expiring within N days */
  isExpiringSoon(days = 30): boolean {
    const d = this.daysUntilExpiry;
    return d !== null && d >= 0 && d <= days;
  }

  /** Total attempt limit reached */
  hasExceededAttempts(max = 3): boolean {
    return this.attempts >= max;
  }

  /** Can be submitted/reviewed */
  canBeReviewed(): boolean {
    return this.isPending() || this.isInReview();
  }

  /** Can be resubmitted */
  canResubmit(): boolean {
    return this.isRejected() || this.isExpired();
  }

  /** Age of verification in days */
  get ageInDays(): number {
    const diff = Date.now() - new Date(this.submittedAt).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /** Exceeded review SLA */
  isOverdue(): boolean {
    if (!this.isPending() && !this.isInReview()) return false;
    return this.ageInDays * 24 > VENDOR_VERIFICATION.REVIEW_SLA_HOURS;
  }
}
