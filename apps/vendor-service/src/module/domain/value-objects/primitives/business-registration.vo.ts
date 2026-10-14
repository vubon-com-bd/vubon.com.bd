/**
 * BusinessRegistration Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Business registration number (BD: BIN, Trade License, etc.)
 * - 6-30 alphanumeric chars
 * - Optional hyphen/slash separators
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PATTERN = /^[A-Z0-9][A-Z0-9\-/]{4,28}[A-Z0-9]$/;
const MIN_LENGTH = 6;
const MAX_LENGTH = 30;

export class BusinessRegistrationVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BusinessRegistrationVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('BusinessRegistration must be a string', 'businessRegistration');
    }
    const normalized = raw.trim().toUpperCase().replace(/\s+/g, '');
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `BusinessRegistration must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'businessRegistration',
      );
    }
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        'BusinessRegistration must be alphanumeric (with optional -/ separators)',
        'businessRegistration',
      );
    }
    return new BusinessRegistrationVO(normalized);
  }

  static reconstitute(raw: string): BusinessRegistrationVO {
    return new BusinessRegistrationVO(raw);
  }

  get normalized(): string {
    return this.value.replace(/[^A-Z0-9]/g, '');
  }
}
