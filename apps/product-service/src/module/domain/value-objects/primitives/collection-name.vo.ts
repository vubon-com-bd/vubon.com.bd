/**
 * CollectionName Value Object
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { COLLECTION } from '@vubon/shared-constants/business/product';

export class CollectionNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CollectionNameVO {
    if (typeof raw !== 'string') {
      throw new Error('CollectionName must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('CollectionName cannot be empty');
    }
    if (trimmed.length > COLLECTION.NAME_MAX_LENGTH) {
      throw new Error(`CollectionName cannot exceed ${COLLECTION.NAME_MAX_LENGTH} chars`);
    }
    return new CollectionNameVO(trimmed);
  }

  static reconstitute(raw: string): CollectionNameVO {
    return new CollectionNameVO(raw);
  }
}
