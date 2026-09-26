import { OrderSubtotalVO } from '../value-objects/primitives/order-subtotal.vo';
import { OrderDiscountVO } from '../value-objects/primitives/order-discount.vo';
import { OrderTaxVO } from '../value-objects/primitives/order-tax.vo';
import { OrderShippingVO } from '../value-objects/primitives/order-shipping.vo';
import { OrderTotalVO } from '../value-objects/primitives/order-total.vo';
import { ValidationError } from '../errors/validation.errors';

export class OrderTotalService {
  static calculate(
    subtotal: OrderSubtotalVO,
    discount: OrderDiscountVO,
    tax: OrderTaxVO,
    shipping: OrderShippingVO,
  ): OrderTotalVO {
    const total = subtotal.value - discount.value + tax.value + shipping.value;
    if (total < 0) {
      throw new ValidationError('OrderTotal', 'cannot be negative');
    }
    return OrderTotalVO.create(total);
  }
}
