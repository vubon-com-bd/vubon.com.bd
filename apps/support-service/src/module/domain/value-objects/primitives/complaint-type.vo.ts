/**
 * ComplaintTypeVO — Complaint classification
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { COMPLAINT_TYPE } from '@vubon/shared-constants/support';

export type ComplaintTypeValue =
  (typeof COMPLAINT_TYPE)[keyof typeof COMPLAINT_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(
  Object.values(COMPLAINT_TYPE),
);

const SEVERE_TYPES: ReadonlySet<string> = new Set<string>([
  'fraud',
  'abuse',
  'safety',
]);

export class ComplaintTypeVO extends BaseTypeVO<ComplaintTypeValue> {
  private constructor(value: ComplaintTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): ComplaintTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid complaint type: ${raw}`,
        'complaintType',
      );
    }
    return new ComplaintTypeVO(normalized as ComplaintTypeValue);
  }

  isSevere(): boolean {
    return SEVERE_TYPES.has(this.value);
  }
}
