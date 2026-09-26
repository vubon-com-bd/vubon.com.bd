import type { CartVoucherEntity } from '../entities/cart-voucher.entity';

export class VoucherValidationService {
  validateUsable(voucher: CartVoucherEntity): void {
    if (voucher.status.value !== 'active') {
      throw new Error('Voucher is not active');
    }
    if (voucher.value <= 0) {
      throw new Error('Voucher value must be positive');
    }
  }
}
