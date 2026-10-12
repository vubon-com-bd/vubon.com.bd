/**
 * BusinessName Value Object — legal registered business name
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 2;
const MAX_LENGTH = 250;

export class BusinessNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BusinessNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Business name must be a string', 'businessName');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH) {
      throw new ValidationError(`Business name must be at least ${MIN_LENGTH} chars`, 'businessName');
    }
    if (normalized.length > MAX_LENGTH) {
      throw new ValidationError(`Business name cannot exceed ${MAX_LENGTH} chars`, 'businessName');
    }
    if (!/^[\p{L}\p{N}\s'.,&()\-/]+$/u.test(normalized)) {
      throw new ValidationError('Business name contains invalid characters', 'businessName');
    }
    return new BusinessNameVO(normalized);
  }

  static reconstitute(raw: string): BusinessNameVO {
    return new BusinessNameVO(raw);
  }
}
