import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class SmsMarketingIdVO extends BaseIdVO {
  static create(raw: string): SmsMarketingIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('SmsMarketingId cannot be empty');
    }
    return new SmsMarketingIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
