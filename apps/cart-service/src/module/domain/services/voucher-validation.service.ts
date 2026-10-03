/**
 * VoucherValidationService — pure voucher redeemability
 * @module cart-service/domain/services
 */
import { CartVoucherCompositeVO } from '../value-objects/composites/cart-voucher.vo.js';

export interface VoucherContext {
  readonly orderTotal: number;
  readonly currency: string;
  readonly now?: Date;
}

export interface VoucherValidationResult {
  readonly valid: boolean;
  readonly redeemableAmount: number;
  readonly reason?: string;
  readonly errorCode?: string;
}

export class VoucherValidationService {
  validate(
    voucher: CartVoucherCompositeVO,
    ctx: VoucherContext,
  ): VoucherValidationResult {
    const now = ctx.now ?? new Date();

    if (!voucher.status.isUsable()) {
      return {
        valid: false,
        redeemableAmount: 0,
        reason: `Voucher status "${voucher.status.value}" is not usable`,
        errorCode: 'VOUCHER_NOT_ACTIVE',
      };
    }
    if (voucher.isExpired(now)) {
      return {
        valid: false,
        redeemableAmount: 0,
        reason: 'Voucher expired',
        errorCode: 'VOUCHER_EXPIRED',
      };
    }
    if (voucher.currency !== ctx.currency) {
      return {
        valid: false,
        redeemableAmount: 0,
        reason: `Currency mismatch (${voucher.currency} vs ${ctx.currency})`,
        errorCode: 'VOUCHER_CURRENCY_MISMATCH',
      };
    }

    const amount = voucher.redeemableAgainst(ctx.orderTotal);
    if (amount <= 0) {
      return {
        valid: false,
        redeemableAmount: 0,
        reason: 'Redeemable amount is zero',
        errorCode: 'VOUCHER_ZERO_REDEEM',
      };
    }
    return { valid: true, redeemableAmount: amount };
  }

  /**
   * How much remains on the voucher after applying orderTotal.
   */
  remainingAfter(voucher: CartVoucherCompositeVO, orderTotal: number): number {
    const applied = voucher.redeemableAgainst(orderTotal);
    return Math.round((voucher.remainingAmount - applied) * 100) / 100;
  }

  /**
   * Whether the order total is fully covered by the voucher.
   */
  fullyCovers(voucher: CartVoucherCompositeVO, orderTotal: number): boolean {
    return voucher.remainingAmount >= orderTotal && voucher.isUsable();
  }
}
