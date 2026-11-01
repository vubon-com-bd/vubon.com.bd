/**
 * ApprovalReason Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_APPROVAL_REASON } from '@vubon/shared-constants/business';

export type ApprovalReasonValue =
  (typeof VENDOR_APPROVAL_REASON)[keyof typeof VENDOR_APPROVAL_REASON];

const VALID_REASONS = new Set<string>(Object.values(VENDOR_APPROVAL_REASON));

export class ApprovalReasonVO extends BaseTypeVO<ApprovalReasonValue> {
  private constructor(value: ApprovalReasonValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_REASONS;
  }

  static create(raw: string): ApprovalReasonVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ApprovalReason must be a string', 'reason');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_REASONS.has(normalized)) {
      throw new ValidationError(
        `Invalid ApprovalReason: "${normalized}". Allowed: ${[...VALID_REASONS].join(', ')}`,
        'reason',
      );
    }
    return new ApprovalReasonVO(normalized as ApprovalReasonValue);
  }

  static reconstitute(raw: string): ApprovalReasonVO {
    return new ApprovalReasonVO(raw as ApprovalReasonValue);
  }

  // ─── Predicates ───
  isComplete(): boolean { return this.value === 'complete'; }
  isIncompleteDocuments(): boolean { return this.value === 'incomplete_documents'; }
  isInvalidDocuments(): boolean { return this.value === 'invalid_documents'; }
  isPolicyViolation(): boolean { return this.value === 'policy_violation'; }
  isFraudSuspected(): boolean { return this.value === 'fraud_suspected'; }
  isDuplicateAccount(): boolean { return this.value === 'duplicate_account'; }
  isOther(): boolean { return this.value === 'other'; }

  /** Reason is severe (auto-block) */
  isSevere(): boolean {
    return this.isFraudSuspected() || this.isDuplicateAccount();
  }

  /** Vendor can fix and resubmit */
  isFixable(): boolean {
    return (
      this.isIncompleteDocuments() ||
      this.isInvalidDocuments() ||
      this.isOther()
    );
  }
}
