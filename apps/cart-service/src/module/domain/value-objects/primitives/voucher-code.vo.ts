import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class VoucherCodeVO extends BaseCodeVO {
  static create(value: string): VoucherCodeVO {
    const normalized = value.trim().toUpperCase();
    if (!/^[A-Z0-9-]{6,32}$/.test(normalized)) {
      throw new Error('Invalid voucher code format');
    }
    return new VoucherCodeVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }
}
