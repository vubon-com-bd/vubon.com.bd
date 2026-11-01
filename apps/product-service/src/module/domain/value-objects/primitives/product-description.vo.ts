/**
 * ProductDescription Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VALIDATION } from '@vubon/shared-constants/common';

const MAX_LENGTH = VALIDATION.DESCRIPTION_MAX_LENGTH;

export class ProductDescriptionVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ProductDescriptionVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ProductDescription must be a string', 'description');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('ProductDescription cannot be empty', 'description');
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `ProductDescription exceeds max ${MAX_LENGTH} chars`,
        'description',
      );
    }
    return new ProductDescriptionVO(trimmed);
  }

  static reconstitute(raw: string): ProductDescriptionVO { return new ProductDescriptionVO(raw); }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }
}
