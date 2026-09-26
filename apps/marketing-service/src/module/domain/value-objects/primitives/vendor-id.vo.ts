import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class VendorIdVO extends BaseIdVO {
  static create(raw: string): VendorIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('VendorId cannot be empty');
    }
    return new VendorIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
