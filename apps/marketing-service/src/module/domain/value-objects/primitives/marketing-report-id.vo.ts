import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class MarketingReportIdVO extends BaseIdVO {
  static create(raw: string): MarketingReportIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('MarketingReportId cannot be empty');
    }
    return new MarketingReportIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
