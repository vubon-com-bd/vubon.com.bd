/**
 * BusinessRegistration Value Object — trade / business license number
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 4;
const MAX_LENGTH = 50;
const PATTERN = /^[A-Z0-9\-\/]+$/;

export class BusinessRegistrationVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BusinessRegistrationVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Business registration must be a string', 'businessRegistration');
    }
    const normalized = raw.trim().toUpperCase();
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `Business registration must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'businessRegistration',
      );
    }
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        'Business registration may contain only A-Z, 0-9, -, /',
        'businessRegistration',
      );
    }
    return new BusinessRegistrationVO(normalized);
  }

  static reconstitute(raw: string): BusinessRegistrationVO {
    return new BusinessRegistrationVO(raw);
  }

  isNumericOnly(): boolean {
    return /^\d+$/.test(this.value);
  }
}
