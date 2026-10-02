/**
 * CollectionSlug Value Object
 */
import { BaseSlugVO } from '@vubon/shared-kernel/domain/primitives';
import { COLLECTION } from '@vubon/shared-constants/business/product';

export class CollectionSlugVO extends BaseSlugVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CollectionSlugVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('CollectionSlug cannot be empty');
    }
    const normalized = raw.trim().toLowerCase();
    if (normalized.length > COLLECTION.SLUG_MAX_LENGTH) {
      throw new Error(`CollectionSlug cannot exceed ${COLLECTION.SLUG_MAX_LENGTH} chars`);
    }
    return new CollectionSlugVO(normalized);
  }

  static reconstitute(raw: string): CollectionSlugVO {
    return new CollectionSlugVO(raw);
  }
}
