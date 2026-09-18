/**
 * Slug Value Object
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { REGEX } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

export class SlugVO extends BaseVO<string> {
  private static readonly MAX_LENGTH = 120;

  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): SlugVO {
    if (typeof raw !== 'string') {
      throw new Error('Slug must be a string');
    }
    const normalized = raw.trim().toLowerCase();

    if (normalized.length === 0) {
      throw new Error('Slug cannot be empty');
    }
    if (normalized.length > SlugVO.MAX_LENGTH) {
      throw new Error(`Slug exceeds ${SlugVO.MAX_LENGTH} chars`);
    }
    if (!REGEX.SLUG.test(normalized)) {
      throw new Error(`Invalid slug format: ${raw}`);
    }

    return new SlugVO(normalized);
  }

  static fromName(name: string): SlugVO {
    const slug = name
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return SlugVO.of(slug);
  }
}
