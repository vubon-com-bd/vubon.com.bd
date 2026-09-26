import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class MarketingAutomationIdVO extends BaseIdVO {
  static create(raw: string): MarketingAutomationIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('MarketingAutomationId cannot be empty');
    }
    return new MarketingAutomationIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
