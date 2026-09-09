import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { Quantity } from '../../common/quantity.types';
import { ORDER_ITEM } from '@vubon/shared-constants/src/business/checkout/order-item.constants';
import { Product } from '../product/product.types';
import { Variant } from '../product/variant.types';
import { Order } from './order.types';

export interface OrderItem extends BaseEntity {
  itemId: string;
  orderId: string;
  order: Order;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: Variant;
  status: keyof typeof ORDER_ITEM.STATUS | string;
  name: string;
  sku: string;
  quantity: Quantity;
  unitPrice: Money;
  totalPrice: Money;
  discountPrice: Money;
  taxPrice: Money;
  finalPrice: Money;
  isReturnable: boolean;
  isRefunded: boolean;
  refundedAmount?: Money;
  metadata: Record<string, unknown>;
}
