import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class AffiliateCommissionVO extends BaseCodeVO {
  static create(raw: string): AffiliateCommissionVO {
    if (!raw) {
      throw new Error('AffiliateCommission cannot be empty');
    }
    return new AffiliateCommissionVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
