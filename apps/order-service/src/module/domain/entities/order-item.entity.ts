import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { OrderItemIdVO } from '../value-objects/primitives/order-item-id.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo';
import { OrderItemQuantityVO } from '../value-objects/primitives/order-item-quantity.vo';
import { OrderItemPriceVO } from '../value-objects/primitives/order-item-price.vo';
import { OrderItemStatusVO } from '../value-objects/primitives/order-item-status.vo';

export interface OrderItemEntityProps {
  readonly productId: ProductIdVO;
  readonly variantId: VariantIdVO | null;
  readonly productName: string;
  readonly quantity: OrderItemQuantityVO;
  readonly priceAtPurchase: OrderItemPriceVO;
  readonly status: OrderItemStatusVO;
}

export class OrderItemEntity extends BaseEntity<OrderItemIdVO> {
  private readonly _productId: ProductIdVO;
  private readonly _variantId: VariantIdVO | null;
  private readonly _productName: string;
  private readonly _quantity: OrderItemQuantityVO;
  private readonly _priceAtPurchase: OrderItemPriceVO;
  private readonly _status: OrderItemStatusVO;

  private constructor(
    id: OrderItemIdVO,
    props: OrderItemEntityProps,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._productId = props.productId;
    this._variantId = props.variantId;
    this._productName = props.productName;
    this._quantity = props.quantity;
    this._priceAtPurchase = props.priceAtPurchase;
    this._status = props.status;
  }

  static create(props: OrderItemEntityProps): OrderItemEntity {
    const now = new Date().toISOString();
    const id = OrderItemIdVO.create(crypto.randomUUID());
    return new OrderItemEntity(id, props, now, now);
  }

  static reconstitute(
    id: OrderItemIdVO,
    props: OrderItemEntityProps,
    createdAt: string,
    updatedAt: string,
  ): OrderItemEntity {
    return new OrderItemEntity(id, props, createdAt, updatedAt);
  }

  changeQuantity(quantity: OrderItemQuantityVO): OrderItemEntity {
    return new OrderItemEntity(
      this.id,
      { ...this._toProps(), quantity },
      this.createdAt,
      new Date().toISOString(),
    );
  }

  changeStatus(status: OrderItemStatusVO): OrderItemEntity {
    return new OrderItemEntity(
      this.id,
      { ...this._toProps(), status },
      this.createdAt,
      new Date().toISOString(),
    );
  }

  get productId(): ProductIdVO { return this._productId; }
  get variantId(): VariantIdVO | null { return this._variantId; }
  get productName(): string { return this._productName; }
  get quantity(): OrderItemQuantityVO { return this._quantity; }
  get priceAtPurchase(): OrderItemPriceVO { return this._priceAtPurchase; }
  get status(): OrderItemStatusVO { return this._status; }

  get lineTotal(): number {
    return this._priceAtPurchase.multiply(this._quantity.value);
  }

  private _toProps(): OrderItemEntityProps {
    return {
      productId: this._productId,
      variantId: this._variantId,
      productName: this._productName,
      quantity: this._quantity,
      priceAtPurchase: this._priceAtPurchase,
      status: this._status,
    };
  }
}
