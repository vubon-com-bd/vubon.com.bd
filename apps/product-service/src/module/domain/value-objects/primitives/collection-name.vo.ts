/**
 * CollectionName Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { COLLECTION } from '@vubon/shared-constants/business';

export class CollectionNameVO extends BaseNameVO {
  private constructor(value: string) { super(value); }

  static create(raw: string): CollectionNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CollectionName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < 1 || normalized.length > COLLECTION.NAME_MAX_LENGTH) {
      throw new ValidationError(
        `CollectionName must be 1-${COLLECTION.NAME_MAX_LENGTH} chars`,
        'name',
      );
    }
    return new CollectionNameVO(normalized);
  }

  static reconstitute(raw: string): CollectionNameVO { return new CollectionNameVO(raw); }
}
