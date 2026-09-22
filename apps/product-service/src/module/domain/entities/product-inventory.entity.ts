import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { InventoryIdVO } from '../value-objects/primitives/inventory-id.vo';
import { InventoryQuantityVO } from '../value-objects/primitives/inventory-quantity.vo';
import { InventoryStatusVO } from '../value-objects/primitives/inventory-status.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';
import {
  InventoryUpdatedEvent,
  InventoryLowEvent,
  OutOfStockEvent,
  InventoryReservedEvent,
  InventoryReleasedEvent,
} from '../events/product-inventory.events';

const LOW_STOCK_THRESHOLD = 5;

export interface ProductInventoryEntityProps {
  readonly productId: ProductIdVO;
  readonly quantity: InventoryQuantityVO;
  readonly reserved: InventoryQuantityVO;
  readonly status: InventoryStatusVO;
}

export class ProductInventoryEntity extends AggregateRoot<InventoryIdVO> {
  private readonly _productId: ProductIdVO;
  private readonly _quantity: InventoryQuantityVO;
  private readonly _reserved: InventoryQuantityVO;
  private readonly _status: InventoryStatusVO;

  private constructor(
    id: InventoryIdVO,
    props: ProductInventoryEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._quantity = props.quantity;
    this._reserved = props.reserved;
    this._status = props.status;
  }

  static create(props: ProductInventoryEntityProps): ProductInventoryEntity {
    const now = new Date().toISOString();
    const id = InventoryIdVO.create(crypto.randomUUID());
    return new ProductInventoryEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: InventoryIdVO,
    props: ProductInventoryEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ProductInventoryEntity {
    return new ProductInventoryEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateQuantity(quantity: InventoryQuantityVO): ProductInventoryEntity {
    const newStatus = quantity.isZero()
      ? InventoryStatusVO.create('out_of_stock')
      : quantity.value <= LOW_STOCK_THRESHOLD
        ? InventoryStatusVO.create('low_stock')
        : InventoryStatusVO.create('in_stock');

    const updated = new ProductInventoryEntity(
      this.id,
      { ...this._toProps(), quantity, status: newStatus },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );

    updated.addDomainEvent(
      new InventoryUpdatedEvent(this._productId.value, this._productId.value, quantity.value, this.version + 1),
    );

    if (quantity.isZero()) {
      updated.addDomainEvent(
        new OutOfStockEvent(this._productId.value, this._productId.value, this.version + 1),
      );
    } else if (quantity.value <= LOW_STOCK_THRESHOLD) {
      updated.addDomainEvent(
        new InventoryLowEvent(
          this._productId.value,
          this._productId.value,
          quantity.value,
          LOW_STOCK_THRESHOLD,
          this.version + 1,
        ),
      );
    }

    return updated;
  }

  reserve(quantity: number, orderId: string): ProductInventoryEntity {
    const available = this.available;
    if (available < quantity) {
      throw new Error(`Insufficient stock: available ${available}, requested ${quantity}`);
    }
    const updated = new ProductInventoryEntity(
      this.id,
      { ...this._toProps(), reserved: InventoryQuantityVO.create(this._reserved.value + quantity) },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new InventoryReservedEvent(this._productId.value, this._productId.value, quantity, orderId, this.version + 1),
    );
    return updated;
  }

  release(quantity: number, orderId: string): ProductInventoryEntity {
    const updated = new ProductInventoryEntity(
      this.id,
      {
        ...this._toProps(),
        reserved: InventoryQuantityVO.create(Math.max(0, this._reserved.value - quantity)),
      },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new InventoryReleasedEvent(this._productId.value, this._productId.value, quantity, orderId, this.version + 1),
    );
    return updated;
  }

  get productId(): ProductIdVO { return this._productId; }
  get quantity(): InventoryQuantityVO { return this._quantity; }
  get reserved(): InventoryQuantityVO { return this._reserved; }
  get status(): InventoryStatusVO { return this._status; }

  get available(): number {
    return this._quantity.value - this._reserved.value;
  }

  private _toProps(): ProductInventoryEntityProps {
    return {
      productId: this._productId,
      quantity: this._quantity,
      reserved: this._reserved,
      status: this._status,
    };
  }
}
