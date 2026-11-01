/**
 * DriverName Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN = 2;
const MAX = 100;

export class DriverNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DriverNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DriverName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN || normalized.length > MAX) {
      throw new ValidationError(
        `DriverName must be ${MIN}-${MAX} chars`,
        'name',
      );
    }
    return new DriverNameVO(normalized);
  }

  static reconstitute(raw: string): DriverNameVO {
    return new DriverNameVO(raw);
  }
}
