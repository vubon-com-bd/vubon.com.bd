import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { VOUCHER_TYPE } from '@vubon/shared-constants/cart';

const VALID = new Set<string>(Object.values(VOUCHER_TYPE));

export class VoucherTypeVO extends BaseTypeVO<string> {
  static create(value: string): VoucherTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid voucher type: ${value}`);
    }
    return new VoucherTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
