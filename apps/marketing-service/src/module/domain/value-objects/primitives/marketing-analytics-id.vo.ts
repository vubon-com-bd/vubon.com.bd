import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class MarketingAnalyticsIdVO extends BaseIdVO {
  static create(raw: string): MarketingAnalyticsIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('MarketingAnalyticsId cannot be empty');
    }
    return new MarketingAnalyticsIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
