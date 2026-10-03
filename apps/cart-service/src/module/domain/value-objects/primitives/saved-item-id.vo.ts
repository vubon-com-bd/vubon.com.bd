/**
 * SavedItemId Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class SavedItemIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SavedItemIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('SavedItemId cannot be empty', 'savedItemId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('SavedItemId must be a valid UUID', 'savedItemId');
    }
    return new SavedItemIdVO(trimmed);
  }

  static reconstitute(raw: string): SavedItemIdVO {
    return new SavedItemIdVO(raw);
  }
}
