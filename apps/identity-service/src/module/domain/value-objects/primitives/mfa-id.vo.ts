/**
 * MfaId Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class MfaIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MfaIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('MfaId cannot be empty', 'mfaId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('MfaId must be a valid UUID', 'mfaId');
    }
    return new MfaIdVO(trimmed);
  }

  static reconstitute(raw: string): MfaIdVO {
    return new MfaIdVO(raw);
  }
}
