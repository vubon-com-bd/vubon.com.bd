/**
 * BrandSlug Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseSlugVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BRAND } from '@vubon/shared-constants/business';

export class BrandSlugVO extends BaseSlugVO {
  private constructor(value: string) { super(value); }

  protected static override maxLength(): number { return BRAND.SLUG_MAX_LENGTH; }

  static create(raw: string): BrandSlugVO {
    const normalized = BaseSlugVO.validateRaw(raw);
    if (normalized.length > BRAND.SLUG_MAX_LENGTH) {
      throw new ValidationError(`BrandSlug exceeds max ${BRAND.SLUG_MAX_LENGTH}`, 'slug');
    }
    return new BrandSlugVO(normalized);
  }

  static fromName(name: string): BrandSlugVO {
    return new BrandSlugVO(BaseSlugVO.slugifyFromName(name));
  }

  static reconstitute(raw: string): BrandSlugVO { return new BrandSlugVO(raw); }
}
