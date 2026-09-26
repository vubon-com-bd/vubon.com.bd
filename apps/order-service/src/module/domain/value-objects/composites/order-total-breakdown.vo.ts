import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { OrderSubtotalVO } from '../primitives/order-subtotal.vo';
import { OrderDiscountVO } from '../primitives/order-discount.vo';
import { OrderTaxVO } from '../primitives/order-tax.vo';
import { OrderShippingVO } from '../primitives/order-shipping.vo';
import { OrderTotalVO } from '../primitives/order-total.vo';

export interface OrderTotalBreakdownProps {
  readonly subtotal: OrderSubtotalVO;
  readonly discount: OrderDiscountVO;
  readonly tax: OrderTaxVO;
  readonly shipping: OrderShippingVO;
  readonly total: OrderTotalVO;
}

export class OrderTotalBreakdownVO extends BaseVO<OrderTotalBreakdownProps> {
  private constructor(props: OrderTotalBreakdownProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: OrderTotalBreakdownProps): OrderTotalBreakdownVO {
    return new OrderTotalBreakdownVO(props);
  }

  get subtotal(): OrderSubtotalVO { return this.value.subtotal; }
  get discount(): OrderDiscountVO { return this.value.discount; }
  get tax(): OrderTaxVO { return this.value.tax; }
  get shipping(): OrderShippingVO { return this.value.shipping; }
  get total(): OrderTotalVO { return this.value.total; }
}
