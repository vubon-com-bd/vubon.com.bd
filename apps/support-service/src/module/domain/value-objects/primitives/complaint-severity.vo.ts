/**
 * ComplaintSeverityVO — Complaint severity level
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { COMPLAINT_SEVERITY } from '@vubon/shared-constants/support';

export type ComplaintSeverityValue =
  (typeof COMPLAINT_SEVERITY)[keyof typeof COMPLAINT_SEVERITY];

const SEVERITY_SET: ReadonlySet<string> = new Set(
  Object.values(COMPLAINT_SEVERITY),
);

const WEIGHTS: Readonly<Record<string, number>> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

export class ComplaintSeverityVO extends BaseTypeVO<ComplaintSeverityValue> {
  private constructor(value: ComplaintSeverityValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return SEVERITY_SET;
  }

  static create(raw: string): ComplaintSeverityVO {
    const normalized = raw.trim().toLowerCase();
    if (!SEVERITY_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid complaint severity: ${raw}`,
        'complaintSeverity',
      );
    }
    return new ComplaintSeverityVO(normalized as ComplaintSeverityValue);
  }

  static medium(): ComplaintSeverityVO {
    return new ComplaintSeverityVO('medium' as ComplaintSeverityValue);
  }

  get weight(): number {
    return WEIGHTS[this.value] ?? 0;
  }

  isCritical(): boolean {
    return this.value === ('critical' as ComplaintSeverityValue);
  }

  isHigherThan(other: ComplaintSeverityVO): boolean {
    return this.weight > other.weight;
  }
}
