/**
 * CartVoucherVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VoucherCodeVO } from '../primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../primitives/voucher-status.vo.js';

export interface CartVoucherVOProps {
  readonly code: VoucherCodeVO;
  readonly status: VoucherStatusVO;
  readonly remainingAmount: number;
  readonly currency: string;
  readonly expiresAt: string;
  readonly appliedAt: string;
}

export class CartVoucherVO extends BaseVO<CartVoucherVOProps> {
  private constructor(props: CartVoucherVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CartVoucherVOProps): CartVoucherVO {
    const vo = new CartVoucherVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CartVoucherVOProps): CartVoucherVO {
    return new CartVoucherVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!Number.isFinite(v.remainingAmount) || v.remainingAmount < 0) {
      throw new ValidationError(
        'remainingAmount must be non-negative',
        'remainingAmount',
      );
    }
  }

  get code(): VoucherCodeVO { return this.value.code; }
  get status(): VoucherStatusVO { return this.value.status; }
  get remainingAmount(): number { return this.value.remainingAmount; }
  get currency(): string { return this.value.currency; }
  get expiresAt(): string { return this.value.expiresAt; }
  get appliedAt(): string { return this.value.appliedAt; }

  isRedeemable(): boolean { return this.status.isRedeemable(); }
  hasBalance(): boolean { return this.value.remainingAmount > 0; }
  canCover(amount: number): boolean {
    return this.value.remainingAmount >= amount;
  }
}
