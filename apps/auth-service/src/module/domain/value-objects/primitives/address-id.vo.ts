import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export class AddressIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AddressIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('AddressId cannot be empty');
    }
    return new AddressIdVO(raw);
  }
}
