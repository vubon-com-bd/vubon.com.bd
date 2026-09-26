import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { OrderItemIdVO } from '../primitives/order-item-id.vo';
import { ProductIdVO } from '../primitives/product-id.vo';
import { VariantIdVO } from '../primitives/variant-id.vo';
import { OrderItemQuantityVO } from '../primitives/order-item-quantity.vo';
import { OrderItemPriceVO } from '../primitives/order-item-price.vo';
import { OrderItemStatusVO } from '../primitives/order-item-status.vo';

export interface OrderItemProps {
  readonly id: OrderItemIdVO;
  readonly productId: ProductIdVO;
  readonly variantId: VariantIdVO | null;
  readonly productName: string;
  readonly quantity: OrderItemQuantityVO;
  readonly priceAtPurchase: OrderItemPriceVO;
  readonly status: OrderItemStatusVO;
}

export class OrderItemVO extends BaseVO<OrderItemProps> {
  private constructor(props: OrderItemProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: OrderItemProps): OrderItemVO {
    return new OrderItemVO(props);
  }

  get id(): OrderItemIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get variantId(): VariantIdVO | null { return this.value.variantId; }
  get productName(): string { return this.value.productName; }
  get quantity(): OrderItemQuantityVO { return this.value.quantity; }
  get priceAtPurchase(): OrderItemPriceVO { return this.value.priceAtPurchase; }
  get status(): OrderItemStatusVO { return this.value.status; }

  get lineTotal(): number {
    return this.value.priceAtPurchase.multiply(this.value.quantity.value);
  }
}
