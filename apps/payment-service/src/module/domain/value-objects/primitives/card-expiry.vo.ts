import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class CardExpiryVO extends BaseCodeVO {
  static create(value: string): CardExpiryVO {
    if (!/^\d{2}\/\d{2,4}$/.test(value)) {
      throw new Error('Card expiry must be MM/YY or MM/YYYY');
    }
    return new CardExpiryVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
