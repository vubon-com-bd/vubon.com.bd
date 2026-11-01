/**
 * BiometricId Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class BiometricIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BiometricIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('BiometricId cannot be empty', 'biometricId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('BiometricId must be a valid UUID', 'biometricId');
    }
    return new BiometricIdVO(trimmed);
  }

  static reconstitute(raw: string): BiometricIdVO {
    return new BiometricIdVO(raw);
  }
}
