/**
 * CategorySlug Value Object
 */
import { BaseSlugVO } from '@vubon/shared-kernel/domain/primitives';
import { CATEGORY } from '@vubon/shared-constants/business/product';

export class CategorySlugVO extends BaseSlugVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CategorySlugVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('CategorySlug cannot be empty');
    }
    const normalized = raw.trim().toLowerCase();
    if (normalized.length > CATEGORY.SLUG_MAX_LENGTH) {
      throw new Error(`CategorySlug cannot exceed ${CATEGORY.SLUG_MAX_LENGTH} chars`);
    }
    return new CategorySlugVO(normalized);
  }

  static fromName(name: string): CategorySlugVO {
    const slug = name
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return CategorySlugVO.create(slug);
  }

  static reconstitute(raw: string): CategorySlugVO {
    return new CategorySlugVO(raw);
  }
}
