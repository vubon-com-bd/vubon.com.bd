import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class VendorIdVO extends BaseIdVO {
  static create(value: string): VendorIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid vendor id');
    }
    return new VendorIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
