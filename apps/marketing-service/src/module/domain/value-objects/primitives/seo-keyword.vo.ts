import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class SeoKeywordVO extends BaseCodeVO {
  static create(raw: string): SeoKeywordVO {
    const normalized = raw.trim().toLowerCase();
    if (normalized.length < 1) {
      throw new Error('SeoKeyword cannot be empty');
    }
    if (normalized.length > 100) {
      throw new Error('SeoKeyword exceeds 100 chars');
    }
    return new SeoKeywordVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }
}
