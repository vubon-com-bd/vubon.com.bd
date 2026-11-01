/**
 * CategorySlug Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseSlugVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CATEGORY } from '@vubon/shared-constants/business';

export class CategorySlugVO extends BaseSlugVO {
  private constructor(value: string) { super(value); }

  protected static override maxLength(): number { return CATEGORY.SLUG_MAX_LENGTH; }

  static create(raw: string): CategorySlugVO {
    const normalized = BaseSlugVO.validateRaw(raw);
    if (normalized.length > CATEGORY.SLUG_MAX_LENGTH) {
      throw new ValidationError(
        `CategorySlug exceeds max ${CATEGORY.SLUG_MAX_LENGTH}`,
        'slug',
      );
    }
    return new CategorySlugVO(normalized);
  }

  static fromName(name: string): CategorySlugVO {
    return new CategorySlugVO(BaseSlugVO.slugifyFromName(name));
  }

  static reconstitute(raw: string): CategorySlugVO { return new CategorySlugVO(raw); }
}
