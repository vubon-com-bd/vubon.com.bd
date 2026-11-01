/**
 * KycId Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class KycIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): KycIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('KycId cannot be empty', 'kycId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('KycId must be a valid UUID', 'kycId');
    }
    return new KycIdVO(trimmed);
  }

  static reconstitute(raw: string): KycIdVO {
    return new KycIdVO(raw);
  }
}
