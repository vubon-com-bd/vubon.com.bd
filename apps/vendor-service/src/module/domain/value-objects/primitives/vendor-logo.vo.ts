/**
 * VendorLogo Value Object — image URL (square aspect preferred)
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 500;
const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

export class VendorLogoVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorLogoVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Vendor logo must be a string', 'logoUrl');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`Vendor logo URL must be 1-${MAX_LENGTH} chars`, 'logoUrl');
    }
    if (!/^https?:\/\/[^\s]+$/i.test(trimmed)) {
      throw new ValidationError('Vendor logo must be a valid http(s) URL', 'logoUrl');
    }
    return new VendorLogoVO(trimmed);
  }

  static reconstitute(raw: string): VendorLogoVO {
    return new VendorLogoVO(raw);
  }

  isSupportedFormat(): boolean {
    const lower = this.value.toLowerCase().split('?')[0];
    return ALLOWED_EXTS.some((ext) => lower.endsWith(ext));
  }
}
