import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class VendorIdVO extends BaseIdVO {
  static create(value: string): VendorIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('VendorId cannot be empty');
    }
    return new VendorIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
