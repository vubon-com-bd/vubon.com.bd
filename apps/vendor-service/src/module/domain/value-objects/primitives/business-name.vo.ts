/**
 * BusinessName Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Legal business name — may contain legal suffixes (Ltd, Inc, Pvt, LLC).
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 2;
const MAX_LENGTH = 200;

export class BusinessNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BusinessNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('BusinessName must be a string', 'businessName');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `BusinessName must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'businessName',
      );
    }
    return new BusinessNameVO(normalized);
  }

  static reconstitute(raw: string): BusinessNameVO {
    return new BusinessNameVO(raw);
  }
}
