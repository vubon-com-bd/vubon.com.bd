/**
 * CartSummary Composite VO — lightweight read-model view
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CartIdVO } from '../primitives/cart-id.vo.js';
import { CartStatusVO } from '../primitives/cart-status.vo.js';
import { CartTypeVO } from '../primitives/cart-type.vo.js';

export interface CartSummaryProps {
  readonly id: CartIdVO;
  readonly type: CartTypeVO;
  readonly status: CartStatusVO;
  readonly itemCount: number;
  readonly uniqueItemCount: number;
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly hasCoupon: boolean;
  readonly hasVoucher: boolean;
  readonly lastActivityAt: string;
}

export class CartSummaryCompositeVO extends BaseVO<CartSummaryProps> {
  private constructor(props: CartSummaryProps) {
    super(props);
  }

  static create(props: CartSummaryProps): CartSummaryCompositeVO {
    return new CartSummaryCompositeVO(props);
  }

  static reconstitute(props: CartSummaryProps): CartSummaryCompositeVO {
    return new CartSummaryCompositeVO(props);
  }

  get id(): CartIdVO { return this.value.id; }
  get type(): CartTypeVO { return this.value.type; }
  get status(): CartStatusVO { return this.value.status; }
  get itemCount(): number { return this.value.itemCount; }
  get uniqueItemCount(): number { return this.value.uniqueItemCount; }
  get subtotal(): number { return this.value.subtotal; }
  get discountAmount(): number { return this.value.discountAmount; }
  get taxAmount(): number { return this.value.taxAmount; }
  get shippingAmount(): number { return this.value.shippingAmount; }
  get total(): number { return this.value.total; }
  get currency(): string { return this.value.currency; }
  get hasCoupon(): boolean { return this.value.hasCoupon; }
  get hasVoucher(): boolean { return this.value.hasVoucher; }
  get lastActivityAt(): string { return this.value.lastActivityAt; }

  isEmpty(): boolean {
    return this.value.itemCount === 0;
  }

  hasDiscount(): boolean {
    return this.value.discountAmount > 0;
  }

  /** For UI display: "Subtotal + 2 more" etc. */
  get hasExtras(): boolean {
    return this.value.taxAmount > 0 || this.value.shippingAmount > 0;
  }
}
