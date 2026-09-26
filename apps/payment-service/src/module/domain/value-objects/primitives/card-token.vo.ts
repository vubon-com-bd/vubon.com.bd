import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class CardTokenVO extends BaseCodeVO {
  static create(value: string): CardTokenVO {
    if (!value || value.trim().length < 8) {
      throw new Error('Invalid card token');
    }
    if (value.length > 255) {
      throw new Error('Card token too long');
    }
    return new CardTokenVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
