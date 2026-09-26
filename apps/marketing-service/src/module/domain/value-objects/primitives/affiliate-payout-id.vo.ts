import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class AffiliatePayoutIdVO extends BaseIdVO {
  static create(raw: string): AffiliatePayoutIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('AffiliatePayoutId cannot be empty');
    }
    return new AffiliatePayoutIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
