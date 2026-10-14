/**
 * VendorSlug Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Business Rules:
 * - Lowercase a-z, 0-9, hyphen
 * - Max 120 chars
 * - Cannot start/end with hyphen
 */
import { BaseSlugVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 120;

export class VendorSlugVO extends BaseSlugVO {
  private constructor(value: string) {
    super(value);
  }

  protected static override maxLength(): number {
    return MAX_LENGTH;
  }

  static create(raw: string): VendorSlugVO {
    const normalized = BaseSlugVO.validateRaw(raw);
    if (normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `VendorSlug exceeds max ${MAX_LENGTH} chars`,
        'slug',
      );
    }
    return new VendorSlugVO(normalized);
  }

  static fromName(name: string): VendorSlugVO {
    return new VendorSlugVO(BaseSlugVO.slugifyFromName(name));
  }

  static reconstitute(raw: string): VendorSlugVO {
    return new VendorSlugVO(raw);
  }
}
