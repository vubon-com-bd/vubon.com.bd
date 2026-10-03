/**
 * CategoryName Value Object
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { CATEGORY } from '@vubon/shared-constants/business/product';

export class CategoryNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CategoryNameVO {
    if (typeof raw !== 'string') {
      throw new Error('CategoryName must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < CATEGORY.NAME_MIN_LENGTH) {
      throw new Error(`CategoryName must be at least ${CATEGORY.NAME_MIN_LENGTH} chars`);
    }
    if (trimmed.length > CATEGORY.NAME_MAX_LENGTH) {
      throw new Error(`CategoryName cannot exceed ${CATEGORY.NAME_MAX_LENGTH} chars`);
    }
    return new CategoryNameVO(trimmed);
  }

  static reconstitute(raw: string): CategoryNameVO {
    return new CategoryNameVO(raw);
  }
}
