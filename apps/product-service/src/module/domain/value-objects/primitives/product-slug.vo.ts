/**
 * ProductSlug Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseSlugVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_LENGTH = 180;

export class ProductSlugVO extends BaseSlugVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductSlugVO {
    if (typeof raw !== 'string') {
      throw new Error('ProductSlug must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (normalized.length === 0) {
      throw new Error('ProductSlug cannot be empty');
    }
    if (normalized.length > MAX_LENGTH) {
      throw new Error(`ProductSlug cannot exceed ${MAX_LENGTH} characters`);
    }
    return new ProductSlugVO(normalized);
  }

  static fromName(name: string): ProductSlugVO {
    const slug = name
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return ProductSlugVO.create(slug);
  }

  static reconstitute(raw: string): ProductSlugVO {
    return new ProductSlugVO(raw);
  }
}
