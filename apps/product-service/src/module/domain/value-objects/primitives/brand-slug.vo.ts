/**
 * BrandSlug Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseSlugVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_LENGTH = 120;

export class BrandSlugVO extends BaseSlugVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BrandSlugVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('BrandSlug cannot be empty');
    }
    const normalized = raw.trim().toLowerCase();
    if (normalized.length > MAX_LENGTH) {
      throw new Error(`BrandSlug cannot exceed ${MAX_LENGTH} characters`);
    }
    return new BrandSlugVO(normalized);
  }

  static fromName(name: string): BrandSlugVO {
    const slug = name
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return BrandSlugVO.create(slug);
  }

  static reconstitute(raw: string): BrandSlugVO {
    return new BrandSlugVO(raw);
  }
}
