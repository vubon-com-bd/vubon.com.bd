/**
 * ApprovalReason Value Object — reason codes for approval decisions
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_APPROVAL_REASON } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_APPROVAL_REASON) as readonly string[];

export class ApprovalReasonVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): ApprovalReasonVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid approval reason "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'reason',
      );
    }
    return new ApprovalReasonVO(raw);
  }

  static reconstitute(raw: string): ApprovalReasonVO {
    return new ApprovalReasonVO(raw);
  }

  static complete(): ApprovalReasonVO {
    return new ApprovalReasonVO(VENDOR_APPROVAL_REASON.COMPLETE);
  }

  isPositive(): boolean {
    return this.value === VENDOR_APPROVAL_REASON.COMPLETE;
  }

  isFraudRelated(): boolean {
    return this.value === VENDOR_APPROVAL_REASON.FRAUD_SUSPECTED
      || this.value === VENDOR_APPROVAL_REASON.DUPLICATE_ACCOUNT;
  }

  isDocumentRelated(): boolean {
    return this.value === VENDOR_APPROVAL_REASON.INCOMPLETE_DOCUMENTS
      || this.value === VENDOR_APPROVAL_REASON.INVALID_DOCUMENTS;
  }
}
