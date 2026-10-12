/**
 * SuspensionReason Value Object — vendor suspension cause
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_SUSPENSION_REASON } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_SUSPENSION_REASON) as readonly string[];

export class SuspensionReasonVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): SuspensionReasonVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid suspension reason "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'suspensionReason',
      );
    }
    return new SuspensionReasonVO(raw);
  }

  static reconstitute(raw: string): SuspensionReasonVO {
    return new SuspensionReasonVO(raw);
  }

  isSevere(): boolean {
    return [
      VENDOR_SUSPENSION_REASON.FRAUD,
      VENDOR_SUSPENSION_REASON.POLICY_VIOLATION,
      VENDOR_SUSPENSION_REASON.INAPPROPRIATE_CONTENT,
    ].includes(this.value as never);
  }

  isFinancial(): boolean {
    return this.value === VENDOR_SUSPENSION_REASON.NON_PAYMENT;
  }

  isPerformanceRelated(): boolean {
    return [
      VENDOR_SUSPENSION_REASON.POOR_PERFORMANCE,
      VENDOR_SUSPENSION_REASON.CUSTOMER_COMPLAINTS,
    ].includes(this.value as never);
  }

  isDocumentRelated(): boolean {
    return this.value === VENDOR_SUSPENSION_REASON.DOCUMENT_EXPIRED;
  }
}
