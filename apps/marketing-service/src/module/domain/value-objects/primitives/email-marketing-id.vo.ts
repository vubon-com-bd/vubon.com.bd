import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class EmailMarketingIdVO extends BaseIdVO {
  static create(raw: string): EmailMarketingIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('EmailMarketingId cannot be empty');
    }
    return new EmailMarketingIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
