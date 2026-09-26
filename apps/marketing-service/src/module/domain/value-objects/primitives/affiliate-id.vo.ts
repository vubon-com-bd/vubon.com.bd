import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class AffiliateIdVO extends BaseIdVO {
  static create(raw: string): AffiliateIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('AffiliateId cannot be empty');
    }
    return new AffiliateIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
