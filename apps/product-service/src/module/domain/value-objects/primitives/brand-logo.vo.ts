/**
 * BrandLogo Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class BrandLogoVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BrandLogoVO {
    if (typeof raw !== 'string') {
      throw new Error('BrandLogo must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length > 0 && !/^https?:\/\/[^\s]+$/.test(trimmed)) {
      throw new Error('BrandLogo must be a valid URL');
    }
    return new BrandLogoVO(trimmed);
  }

  static empty(): BrandLogoVO {
    return new BrandLogoVO('');
  }

  static reconstitute(raw: string): BrandLogoVO {
    return new BrandLogoVO(raw);
  }
}
