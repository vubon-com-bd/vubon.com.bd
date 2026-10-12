/**
 * VendorBanner Value Object — storefront banner image URL
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 500;
const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

export class VendorBannerVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorBannerVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Vendor banner must be a string', 'bannerUrl');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`Vendor banner URL must be 1-${MAX_LENGTH} chars`, 'bannerUrl');
    }
    if (!/^https?:\/\/[^\s]+$/i.test(trimmed)) {
      throw new ValidationError('Vendor banner must be a valid http(s) URL', 'bannerUrl');
    }
    return new VendorBannerVO(trimmed);
  }

  static reconstitute(raw: string): VendorBannerVO {
    return new VendorBannerVO(raw);
  }

  isSupportedFormat(): boolean {
    const lower = this.value.toLowerCase().split('?')[0];
    return ALLOWED_EXTS.some((ext) => lower.endsWith(ext));
  }
}
