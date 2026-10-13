/**
 * ProductSlug Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseSlugVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 200;

export class ProductSlugVO extends BaseSlugVO {
  private constructor(value: string) { super(value); }

  protected static override maxLength(): number { return MAX_LENGTH; }

  static create(raw: string): ProductSlugVO {
    const normalized = BaseSlugVO.validateRaw(raw);
    if (normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `ProductSlug exceeds max ${MAX_LENGTH} chars`,
        'slug',
      );
    }
    return new ProductSlugVO(normalized);
  }

  static fromName(name: string): ProductSlugVO {
    return new ProductSlugVO(BaseSlugVO.slugifyFromName(name));
  }

  static reconstitute(raw: string): ProductSlugVO { return new ProductSlugVO(raw); }
}
