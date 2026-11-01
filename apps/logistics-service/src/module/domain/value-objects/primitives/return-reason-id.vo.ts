/**
 * ReturnReasonId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ReturnReasonIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReturnReasonIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ReturnReasonId cannot be empty', 'returnReasonId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError(
        'ReturnReasonId must be a valid UUID',
        'returnReasonId',
      );
    }
    return new ReturnReasonIdVO(trimmed);
  }

  static reconstitute(raw: string): ReturnReasonIdVO {
    return new ReturnReasonIdVO(raw);
  }
}
