import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CartIdVO } from '../primitives/cart-id.vo';
import { CartStatusVO } from '../primitives/cart-status.vo';

export interface CartSummaryVOProps {
  readonly cartId: CartIdVO;
  readonly status: CartStatusVO;
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly grandTotal: number;
  readonly currency: string;
  readonly hasCoupon: boolean;
  readonly hasVoucher: boolean;
}

export class CartSummaryVO extends BaseVO<CartSummaryVOProps> {
  private constructor(props: CartSummaryVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CartSummaryVOProps): CartSummaryVO {
    return new CartSummaryVO(props);
  }

  get cartId(): CartIdVO { return this.value.cartId; }
  get status(): CartStatusVO { return this.value.status; }
  get itemCount(): number { return this.value.itemCount; }
  get subtotal(): number { return this.value.subtotal; }
  get discountTotal(): number { return this.value.discountTotal; }
  get grandTotal(): number { return this.value.grandTotal; }
  get currency(): string { return this.value.currency; }
  get hasCoupon(): boolean { return this.value.hasCoupon; }
  get hasVoucher(): boolean { return this.value.hasVoucher; }
}
