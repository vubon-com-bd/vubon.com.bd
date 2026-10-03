/**
 * Cart Voucher Composite VO
 * @module cart-service/domain/value-objects/composites
 *
 * Business rules:
 * - Voucher must be active & not expired
 * - Remaining balance >= amount being redeemed
 * - Partial redemption allowed if flag set
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VoucherCodeVO } from '../primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../primitives/voucher-status.vo.js';

export interface CartVoucherProps {
  readonly code: VoucherCodeVO;
  readonly status: VoucherStatusVO;
  readonly initialAmount: number;
  readonly remainingAmount: number;
  readonly currency: string;
  readonly expiresAt: string;
  readonly partialRedeemAllowed: boolean;
}

export class CartVoucherCompositeVO extends BaseVO<CartVoucherProps> {
  private constructor(props: CartVoucherProps) {
    super(props);
  }

  static create(props: CartVoucherProps): CartVoucherCompositeVO {
    if (props.initialAmount < 0 || props.remainingAmount < 0) {
      throw new ValidationError('Voucher amounts cannot be negative', 'amount');
    }
    if (props.remainingAmount > props.initialAmount) {
      throw new ValidationError(
        'remainingAmount cannot exceed initialAmount',
        'remainingAmount',
      );
    }
    return new CartVoucherCompositeVO(props);
  }

  static reconstitute(props: CartVoucherProps): CartVoucherCompositeVO {
    return new CartVoucherCompositeVO(props);
  }

  get code(): VoucherCodeVO { return this.value.code; }
  get status(): VoucherStatusVO { return this.value.status; }
  get initialAmount(): number { return this.value.initialAmount; }
  get remainingAmount(): number { return this.value.remainingAmount; }
  get currency(): string { return this.value.currency; }
  get expiresAt(): string { return this.value.expiresAt; }
  get partialRedeemAllowed(): boolean { return this.value.partialRedeemAllowed; }

  isExpired(now: Date = new Date()): boolean {
    return now.getTime() > Date.parse(this.value.expiresAt);
  }

  isUsable(now: Date = new Date()): boolean {
    return this.value.status.isUsable() && !this.isExpired(now);
  }

  /** Amount that can be redeemed against a given order total */
  redeemableAgainst(orderTotal: number): number {
    if (orderTotal <= 0) return 0;
    if (!this.isUsable()) return 0;
    if (!this.value.partialRedeemAllowed && orderTotal > this.value.remainingAmount) {
      return 0;
    }
    return Math.min(orderTotal, this.value.remainingAmount);
  }

  isFullyRedeemed(): boolean {
    return this.value.remainingAmount === 0;
  }
}
