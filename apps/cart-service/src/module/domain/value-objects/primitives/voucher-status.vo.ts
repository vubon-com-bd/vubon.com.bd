import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { VOUCHER_STATUS } from '@vubon/shared-constants/cart';

const VALID = new Set<string>(Object.values(VOUCHER_STATUS));

export class VoucherStatusVO extends BaseStatusVO<string> {
  static create(value: string): VoucherStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid voucher status: ${value}`);
    }
    return new VoucherStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
