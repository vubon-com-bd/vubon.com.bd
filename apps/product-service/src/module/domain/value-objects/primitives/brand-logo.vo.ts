/**
 * BrandLogo Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';

export class BrandLogoVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): BrandLogoVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('BrandLogo must be a string', 'logoUrl');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0 || trimmed.length > VALIDATION.URL_MAX_LENGTH) {
      throw new ValidationError('BrandLogo URL length is invalid', 'logoUrl');
    }
    if (!REGEX.URL.test(trimmed)) {
      throw new ValidationError('BrandLogo must be a valid URL', 'logoUrl');
    }
    return new BrandLogoVO(trimmed);
  }

  static reconstitute(raw: string): BrandLogoVO { return new BrandLogoVO(raw); }

  isHttps(): boolean { return this.value.startsWith('https://'); }
}
