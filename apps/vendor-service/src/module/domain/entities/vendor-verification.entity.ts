/**
 * VendorVerificationEntity — aggregate of verification checks
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_VERIFICATION } from '@vubon/shared-constants/business';
import { VerificationStatusVO } from '../value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../value-objects/primitives/verification-type.vo.js';

export interface VerificationCheckProps {
  readonly type: VerificationTypeVO;
  readonly status: VerificationStatusVO;
  readonly verifiedAt?: string;
  readonly expiresAt?: string;
  readonly verifiedBy?: string;
  readonly rejectionReason?: string;
}

export interface VendorVerificationEntityProps {
  readonly vendorId: string;
  readonly overallStatus: VerificationStatusVO;
  readonly checks: readonly VerificationCheckProps[];
  readonly submittedAt?: string;
  readonly reviewedAt?: string;
  readonly reviewedBy?: string;
  readonly rejectionReason?: string;
  readonly expiresAt?: string;
}

export class VendorVerificationEntity extends AggregateRoot<string> {
  private _overallStatus: VerificationStatusVO;
  private _checks: VerificationCheckProps[];
  private _submittedAt?: string;
  private _reviewedAt?: string;
  private _reviewedBy?: string;
  private _rejectionReason?: string;
  private _expiresAt?: string;

  private readonly _vendorId: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorVerificationEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._overallStatus = props.overallStatus;
    this._checks = [...props.checks];
    this._submittedAt = props.submittedAt;
    this._reviewedAt = props.reviewedAt;
    this._reviewedBy = props.reviewedBy;
    this._rejectionReason = props.rejectionReason;
    this._expiresAt = props.expiresAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._checks.length > 20) {
      throw new ValidationError('Verification checks cannot exceed 20', 'checks');
    }
    const seen = new Set<string>();
    for (const c of this._checks) {
      if (seen.has(c.type.value)) {
        throw new ValidationError(`Duplicate verification check "${c.type.value}"`, 'checks');
      }
      seen.add(c.type.value);
    }
  }

  get vendorId(): string { return this._vendorId; }
  get overallStatus(): VerificationStatusVO { return this._overallStatus; }
  get checks(): readonly VerificationCheckProps[] { return this._checks; }
  get submittedAt(): string | undefined { return this._submittedAt; }
  get reviewedAt(): string | undefined { return this._reviewedAt; }
  get reviewedBy(): string | undefined { return this._reviewedBy; }
  get rejectionReason(): string | undefined { return this._rejectionReason; }
  get expiresAt(): string | undefined { return this._expiresAt; }

  getCheck(type: VerificationTypeVO): VerificationCheckProps | undefined {
    return this._checks.find((c) => c.type.value === type.value);
  }

  countVerified(): number {
    return this._checks.filter((c) => c.status.isApproved()).length;
  }

  countPending(): number {
    return this._checks.filter((c) => c.status.isPending() || c.status.isInReview()).length;
  }

  getCompletionRatio(): number {
    if (this._checks.length === 0) return 0;
    return Math.round((this.countVerified() / this._checks.length) * 100) / 100;
  }

  isFullyVerified(): boolean {
    return this._overallStatus.isApproved();
  }

  isPendingReview(): boolean {
    return this._overallStatus.isPending() || this._overallStatus.isInReview();
  }

  /** Check every mandatory verification type. */
  hasAllRequiredChecks(): boolean {
    const required: Array<{ key: keyof typeof VENDOR_VERIFICATION; type: string }> = [
      { key: 'REQUIRE_EMAIL', type: 'email' },
      { key: 'REQUIRE_PHONE', type: 'phone' },
      { key: 'REQUIRE_BUSINESS_LICENSE', type: 'business_license' },
      { key: 'REQUIRE_TAX_ID', type: 'tax_id' },
      { key: 'REQUIRE_BANK_ACCOUNT', type: 'bank_account' },
      { key: 'REQUIRE_IDENTITY', type: 'identity' },
    ];
    for (const req of required) {
      if (!VENDOR_VERIFICATION[req.key]) continue;
      const check = this._checks.find((c) => c.type.value === req.type);
      if (!check || !check.status.isApproved()) return false;
    }
    return true;
  }

  submit(now: string = new Date().toISOString()): void {
    if (!this._overallStatus.isNotStarted() && !this._overallStatus.isExpired()) {
      throw new BusinessRuleError(
        `Cannot submit verification in status "${this._overallStatus.value}"`,
        'VERIFICATION_NOT_SUBMITTABLE',
        { verificationId: this.id, status: this._overallStatus.value },
      );
    }
    this._overallStatus = VerificationStatusVO.pending();
    this._submittedAt = now;
    this._reviewedAt = undefined;
    this._reviewedBy = undefined;
    this._rejectionReason = undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  startReview(reviewedBy: string, now: string = new Date().toISOString()): void {
    if (!this._overallStatus.isPending()) {
      throw new BusinessRuleError(
        `Cannot start review in status "${this._overallStatus.value}"`,
        'VERIFICATION_NOT_REVIEWABLE',
        { verificationId: this.id, status: this._overallStatus.value },
      );
    }
    this._overallStatus = VerificationStatusVO.inReview();
    this._reviewedBy = reviewedBy;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  approve(reviewedBy: string, now: string = new Date().toISOString()): void {
    if (!this._overallStatus.isInReview() && !this._overallStatus.isPending()) {
      throw new BusinessRuleError(
        `Cannot approve verification in status "${this._overallStatus.value}"`,
        'VERIFICATION_NOT_APPROVABLE',
        { verificationId: this.id, status: this._overallStatus.value },
      );
    }
    if (!this.hasAllRequiredChecks()) {
      throw new BusinessRuleError(
        'All required verification checks must pass before approval',
        'VERIFICATION_INCOMPLETE',
        { verificationId: this.id },
      );
    }
    this._overallStatus = VerificationStatusVO.approved();
    this._reviewedAt = now;
    this._reviewedBy = reviewedBy;
    this._rejectionReason = undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  reject(reviewedBy: string, reason: string, now: string = new Date().toISOString()): void {
    if (!this._overallStatus.isInReview() && !this._overallStatus.isPending()) {
      throw new BusinessRuleError(
        `Cannot reject verification in status "${this._overallStatus.value}"`,
        'VERIFICATION_NOT_REJECTABLE',
        { verificationId: this.id, status: this._overallStatus.value },
      );
    }
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Rejection reason is required', 'rejectionReason');
    }
    this._overallStatus = VerificationStatusVO.rejected();
    this._reviewedAt = now;
    this._reviewedBy = reviewedBy;
    this._rejectionReason = reason.trim();
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vendorId: string;
    now: string;
  }): VendorVerificationEntity {
    return new VendorVerificationEntity(
      params.id,
      params.now,
      params.now,
      {
        vendorId: params.vendorId,
        overallStatus: VerificationStatusVO.notStarted(),
        checks: [],
      },
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorVerificationEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorVerificationEntity {
    const entity = new VendorVerificationEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
