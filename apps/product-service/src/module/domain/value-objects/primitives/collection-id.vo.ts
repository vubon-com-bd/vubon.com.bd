/**
 * CollectionId Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CollectionIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): CollectionIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CollectionId cannot be empty', 'collectionId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('CollectionId must be a valid UUID', 'collectionId');
    }
    return new CollectionIdVO(trimmed);
  }

  static reconstitute(raw: string): CollectionIdVO { return new CollectionIdVO(raw); }
}
