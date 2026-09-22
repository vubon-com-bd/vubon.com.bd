import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface CartTotalsVOProps {
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly taxTotal: number;
  readonly shippingTotal: number;
  readonly grandTotal: number;
  readonly currency: string;
}

export class CartTotalsVO extends BaseVO<CartTotalsVOProps> {
  private constructor(props: CartTotalsVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CartTotalsVOProps): CartTotalsVO {
    return new CartTotalsVO(props);
  }

  get itemCount(): number { return this.value.itemCount; }
  get subtotal(): number { return this.value.subtotal; }
  get discountTotal(): number { return this.value.discountTotal; }
  get taxTotal(): number { return this.value.taxTotal; }
  get shippingTotal(): number { return this.value.shippingTotal; }
  get grandTotal(): number { return this.value.grandTotal; }
  get currency(): string { return this.value.currency; }
}
