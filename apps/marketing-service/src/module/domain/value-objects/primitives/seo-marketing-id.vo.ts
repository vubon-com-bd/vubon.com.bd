import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class SeoMarketingIdVO extends BaseIdVO {
  static create(raw: string): SeoMarketingIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('SeoMarketingId cannot be empty');
    }
    return new SeoMarketingIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
