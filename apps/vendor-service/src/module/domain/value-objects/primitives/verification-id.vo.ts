/**
 * VerificationId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VerificationIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VerificationIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('VerificationId cannot be empty', 'verificationId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('VerificationId must be a valid UUID', 'verificationId');
    }
    return new VerificationIdVO(trimmed);
  }

  static reconstitute(raw: string): VerificationIdVO {
    return new VerificationIdVO(raw);
  }
}
