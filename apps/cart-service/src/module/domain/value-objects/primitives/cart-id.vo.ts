import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class CartIdVO extends BaseIdVO {
  static create(value: string): CartIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid cart id');
    }
    return new CartIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
