/**
 * ComplaintStatusVO — Complaint resolution status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { COMPLAINT_STATUS } from '@vubon/shared-constants/support';

export type ComplaintStatusValue =
  (typeof COMPLAINT_STATUS)[keyof typeof COMPLAINT_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(COMPLAINT_STATUS),
);

const RESOLVED: ReadonlySet<string> = new Set<string>(['resolved', 'closed', 'rejected']);

export class ComplaintStatusVO extends BaseStatusVO<ComplaintStatusValue> {
  private constructor(value: ComplaintStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): ComplaintStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid complaint status: ${raw}`,
        'complaintStatus',
      );
    }
    return new ComplaintStatusVO(normalized as ComplaintStatusValue);
  }

  isResolved(): boolean {
    return RESOLVED.has(this.value);
  }

  isPending(): boolean {
    return this.value === ('pending' as ComplaintStatusValue);
  }
}
