/**
 * SuspensionReason Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SUSPENSION_REASON } from '@vubon/shared-constants/business';

export type SuspensionReasonValue =
  (typeof VENDOR_SUSPENSION_REASON)[keyof typeof VENDOR_SUSPENSION_REASON];

const VALID_REASONS = new Set<string>(Object.values(VENDOR_SUSPENSION_REASON));

export class SuspensionReasonVO extends BaseTypeVO<SuspensionReasonValue> {
  private constructor(value: SuspensionReasonValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_REASONS;
  }

  static create(raw: string): SuspensionReasonVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('SuspensionReason must be a string', 'reason');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_REASONS.has(normalized)) {
      throw new ValidationError(
        `Invalid SuspensionReason: "${normalized}". Allowed: ${[...VALID_REASONS].join(', ')}`,
        'reason',
      );
    }
    return new SuspensionReasonVO(normalized as SuspensionReasonValue);
  }

  static reconstitute(raw: string): SuspensionReasonVO {
    return new SuspensionReasonVO(raw as SuspensionReasonValue);
  }

  // ─── Predicates ───
  isPolicyViolation(): boolean { return this.value === 'policy_violation'; }
  isFraud(): boolean { return this.value === 'fraud'; }
  isNonPayment(): boolean { return this.value === 'non_payment'; }
  isPoorPerformance(): boolean { return this.value === 'poor_performance'; }
  isCustomerComplaints(): boolean { return this.value === 'customer_complaints'; }
  isDocumentExpired(): boolean { return this.value === 'document_expired'; }
  isInappropriateContent(): boolean { return this.value === 'inappropriate_content'; }
  isOther(): boolean { return this.value === 'other'; }

  /** Severe — long suspension, no auto-lift */
  isSevere(): boolean {
    return this.isFraud() || this.isPolicyViolation();
  }

  /** Auto-resolvable (after payment/doc renew) */
  isAutoResolvable(): boolean {
    return this.isNonPayment() || this.isDocumentExpired();
  }

  /** Requires manual review */
  requiresManualReview(): boolean {
    return (
      this.isFraud() ||
      this.isPolicyViolation() ||
      this.isInappropriateContent() ||
      this.isCustomerComplaints()
    );
  }
}
