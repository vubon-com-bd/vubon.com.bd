/**
 * ZoneName Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN = 2;
const MAX = 150;

export class ZoneNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ZoneNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ZoneName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN || normalized.length > MAX) {
      throw new ValidationError(`ZoneName must be ${MIN}-${MAX} chars`, 'name');
    }
    return new ZoneNameVO(normalized);
  }

  static reconstitute(raw: string): ZoneNameVO {
    return new ZoneNameVO(raw);
  }
}
