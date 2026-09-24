import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class VendorIdVO extends BaseIdVO {
  static create(value: string): VendorIdVO {
    return new VendorIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
