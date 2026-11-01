/**
 * CollectionType Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { COLLECTION_TYPE } from '@vubon/shared-constants/business';

export type CollectionTypeValue = (typeof COLLECTION_TYPE)[keyof typeof COLLECTION_TYPE];

const VALID: readonly string[] = Object.values(COLLECTION_TYPE);

export class CollectionTypeVO extends BaseTypeVO<CollectionTypeValue> {
  private constructor(value: CollectionTypeValue) { super(value); }

  protected static override allowedValues(): ReadonlySet<string> {
    return new Set(VALID);
  }

  static create(raw: string): CollectionTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CollectionType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID.includes(normalized)) {
      throw new ValidationError(
        `Invalid CollectionType: "${normalized}". Allowed: ${VALID.join(', ')}`,
        'type',
      );
    }
    return new CollectionTypeVO(normalized as CollectionTypeValue);
  }

  static reconstitute(raw: string): CollectionTypeVO {
    return new CollectionTypeVO(raw as CollectionTypeValue);
  }

  isManual(): boolean { return this.value === COLLECTION_TYPE.MANUAL; }
  isAutomatic(): boolean { return this.value === COLLECTION_TYPE.AUTOMATIC; }
  isSeasonal(): boolean { return this.value === COLLECTION_TYPE.SEASONAL; }
  isFeatured(): boolean { return this.value === COLLECTION_TYPE.FEATURED; }
  isTrending(): boolean { return this.value === COLLECTION_TYPE.TRENDING; }
  isNewArrival(): boolean { return this.value === COLLECTION_TYPE.NEW_ARRIVAL; }
  isBestSeller(): boolean { return this.value === COLLECTION_TYPE.BEST_SELLER; }

  isCurated(): boolean {
    return this.isManual() || this.isSeasonal() || this.isFeatured();
  }
}
