import { Injectable } from '@nestjs/common';
import { OrderSubtotalVO } from '../../../domain/value-objects/primitives/order-subtotal.vo';
import { OrderDiscountVO } from '../../../domain/value-objects/primitives/order-discount.vo';
import { OrderTaxVO } from '../../../domain/value-objects/primitives/order-tax.vo';
import { OrderShippingVO } from '../../../domain/value-objects/primitives/order-shipping.vo';
import { OrderTotalVO } from '../../../domain/value-objects/primitives/order-total.vo';

@Injectable()
export class OrderTotalCalculatorService {
  calculate(
    subtotal: OrderSubtotalVO,
    discount: OrderDiscountVO,
    tax: OrderTaxVO,
    shipping: OrderShippingVO,
  ): OrderTotalVO {
    const total = subtotal.value - discount.value + tax.value + shipping.value;
    if (total < 0) {
      throw new Error('Order total cannot be negative');
    }
    return OrderTotalVO.create(total);
  }
}
