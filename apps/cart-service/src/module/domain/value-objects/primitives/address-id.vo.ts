import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class AddressIdVO extends BaseIdVO {
  static create(value: string): AddressIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid address id');
    }
    return new AddressIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
