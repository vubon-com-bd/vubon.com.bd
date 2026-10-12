/**
 * VendorVerificationSummaryVO — snapshot of verification status across checks
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VerificationStatusVO } from '../primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../primitives/verification-type.vo.js';
import { VENDOR_VERIFICATION } from '@vubon/shared-constants/business';

export interface VerificationCheck {
  readonly type: VerificationTypeVO;
  readonly status: VerificationStatusVO;
  readonly verifiedAt?: string;
  readonly expiresAt?: string;
}

export interface VendorVerificationSummaryVOProps {
  readonly overallStatus: VerificationStatusVO;
  readonly checks: readonly VerificationCheck[];
  readonly submittedAt?: string;
  readonly reviewedAt?: string;
  readonly rejectionReason?: string;
}

export class VendorVerificationSummaryVO extends BaseVO<VendorVerificationSummaryVOProps> {
  private constructor(props: VendorVerificationSummaryVOProps) {
    super(props);
  }

  static create(props: VendorVerificationSummaryVOProps): VendorVerificationSummaryVO {
    if (!(props.overallStatus instanceof VerificationStatusVO)) {
      throw new ValidationError('Verification summary requires VerificationStatusVO', 'overallStatus');
    }
    if (!Array.isArray(props.checks)) {
      throw new ValidationError('Verification checks must be an array', 'checks');
    }
    if (props.checks.length > 20) {
      throw new ValidationError('Verification checks cannot exceed 20 items', 'checks');
    }
    // Reject duplicate check types
    const seen = new Set<string>();
    for (const c of props.checks) {
      if (!(c.type instanceof VerificationTypeVO)) {
        throw new ValidationError('Each check requires a VerificationTypeVO', 'checks.type');
      }
      if (seen.has(c.type.value)) {
        throw new ValidationError(`Duplicate verification check for "${c.type.value}"`, 'checks');
      }
      seen.add(c.type.value);
    }
    return new VendorVerificationSummaryVO(props);
  }

  static reconstitute(props: VendorVerificationSummaryVOProps): VendorVerificationSummaryVO {
    return new VendorVerificationSummaryVO(props);
  }

  get overallStatus(): VerificationStatusVO { return this.value.overallStatus; }
  get checks(): readonly VerificationCheck[] { return this.value.checks; }

  getCheck(type: VerificationTypeVO): VerificationCheck | undefined {
    return this.value.checks.find((c) => c.type.value === type.value);
  }

  hasCheck(type: VerificationTypeVO): boolean {
    return this.getCheck(type) !== undefined;
  }

  countVerified(): number {
    return this.value.checks.filter((c) => c.status.isApproved()).length;
  }

  countPending(): number {
    return this.value.checks.filter((c) => c.status.isPending() || c.status.isInReview()).length;
  }

  countRejected(): number {
    return this.value.checks.filter((c) => c.status.isRejected()).length;
  }

  completionRatio(): number {
    const total = this.value.checks.length;
    if (total === 0) return 0;
    return Math.round((this.countVerified() / total) * 100) / 100;
  }

  /** Business rule: are all required verification checks approved? */
  allRequiredChecksPassed(): boolean {
    const required: Array<keyof typeof VENDOR_VERIFICATION> = [
      'REQUIRE_EMAIL',
      'REQUIRE_PHONE',
      'REQUIRE_BUSINESS_LICENSE',
      'REQUIRE_TAX_ID',
      'REQUIRE_BANK_ACCOUNT',
      'REQUIRE_IDENTITY',
    ];
    for (const key of required) {
      if (!VENDOR_VERIFICATION[key]) continue;
      const checkType = key.replace('REQUIRE_', '').toLowerCase();
      const check = this.value.checks.find((c) => c.type.value.includes(checkType));
      if (!check || !check.status.isApproved()) return false;
    }
    return true;
  }

  isFullyVerified(): boolean {
    return this.value.overallStatus.isApproved();
  }

  isPendingReview(): boolean {
    return this.value.overallStatus.isPending() || this.value.overallStatus.isInReview();
  }
}
