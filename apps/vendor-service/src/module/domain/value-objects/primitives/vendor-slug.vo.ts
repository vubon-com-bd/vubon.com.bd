/**
 * VendorSlug Value Object — URL-safe unique slug
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseSlugVO } from '@vubon/shared-kernel/domain/primitives/slug.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 2;
const MAX_LENGTH = 150;

export class VendorSlugVO extends BaseSlugVO {
  private constructor(value: string) {
    super(value);
  }

  protected static maxLength(): number {
    return MAX_LENGTH;
  }

  static create(raw: string): VendorSlugVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Vendor slug must be a string', 'slug');
    }
    const normalized = raw.trim().toLowerCase();
    if (normalized.length < MIN_LENGTH) {
      throw new ValidationError(`Vendor slug must be at least ${MIN_LENGTH} chars`, 'slug');
    }
    if (normalized.length > MAX_LENGTH) {
      throw new ValidationError(`Vendor slug cannot exceed ${MAX_LENGTH} chars`, 'slug');
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized)) {
      throw new ValidationError(
        'Vendor slug must contain only lowercase letters, digits, and hyphens',
        'slug',
      );
    }
    return new VendorSlugVO(normalized);
  }

  static fromName(name: string): VendorSlugVO {
    const slugified = name
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, MAX_LENGTH);
    return VendorSlugVO.create(slugified);
  }

  static reconstitute(raw: string): VendorSlugVO {
    return new VendorSlugVO(raw);
  }
}
