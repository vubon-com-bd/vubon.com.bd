/**
 * ApprovalId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ApprovalIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ApprovalIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ApprovalId cannot be empty', 'approvalId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('ApprovalId must be a valid UUID', 'approvalId');
    }
    return new ApprovalIdVO(trimmed);
  }

  static reconstitute(raw: string): ApprovalIdVO {
    return new ApprovalIdVO(raw);
  }
}
