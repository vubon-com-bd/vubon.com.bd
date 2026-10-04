/**
 * Slug Value Objects
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { REGEX } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo.js';

/**
 * Abstract base for slug VOs.
 * Subclasses can override `maxLength()` to constrain further.
 */
export abstract class BaseSlugVO extends BaseVO<string> {
  private static readonly DEFAULT_MAX_LENGTH = 120;

  protected constructor(value: string) {
    super(value);
  }

  protected static maxLength(): number {
    return BaseSlugVO.DEFAULT_MAX_LENGTH;
  }

  protected static validateRaw(raw: string): string {
    if (typeof raw !== 'string') {
      throw new Error('Slug must be a string');
    }
    const normalized = raw.trim().toLowerCase();

    if (normalized.length === 0) {
      throw new Error('Slug cannot be empty');
    }
    if (normalized.length > this.maxLength()) {
      throw new Error(`Slug exceeds ${this.maxLength()} chars`);
    }
    if (!REGEX.SLUG.test(normalized)) {
      throw new Error(`Invalid slug format: ${raw}`);
    }
    return normalized;
  }

  protected static slugifyFromName(name: string): string {
    return name
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

export class SlugVO extends BaseSlugVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): SlugVO {
    return new SlugVO(BaseSlugVO.validateRaw(raw));
  }

  static fromName(name: string): SlugVO {
    return new SlugVO(BaseSlugVO.validateRaw(BaseSlugVO.slugifyFromName(name)));
  }
}
