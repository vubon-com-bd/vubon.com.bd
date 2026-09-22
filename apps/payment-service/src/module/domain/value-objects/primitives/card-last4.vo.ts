import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class CardLast4VO extends BaseCodeVO {
  static create(value: string): CardLast4VO {
    if (!/^\d{4}$/.test(value)) {
      throw new Error('Card last4 must be exactly 4 digits');
    }
    return new CardLast4VO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
