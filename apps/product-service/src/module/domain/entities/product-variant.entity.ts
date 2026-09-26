import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo';
import { VariantNameVO } from '../value-objects/primitives/variant-name.vo';
import { VariantSkuVO } from '../value-objects/primitives/variant-sku.vo';
import { PriceAmountVO } from '../value-objects/primitives/price-amount.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';
import {
  VariantAddedEvent,
  VariantUpdatedEvent,
  VariantRemovedEvent,
  DefaultVariantSetEvent,
} from '../events/product-variant.events';

export interface ProductVariantEntityProps {
  readonly productId: ProductIdVO;
  readonly name: VariantNameVO;
  readonly sku: VariantSkuVO;
  readonly price: PriceAmountVO;
  readonly isDefault: boolean;
}

export class ProductVariantEntity extends AggregateRoot<VariantIdVO> {
  private readonly _productId: ProductIdVO;
  private readonly _name: VariantNameVO;
  private readonly _sku: VariantSkuVO;
  private readonly _price: PriceAmountVO;
  private readonly _isDefault: boolean;

  private constructor(
    id: VariantIdVO,
    props: ProductVariantEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._name = props.name;
    this._sku = props.sku;
    this._price = props.price;
    this._isDefault = props.isDefault;
  }

  static create(props: ProductVariantEntityProps): ProductVariantEntity {
    const now = new Date().toISOString();
    const id = VariantIdVO.create(crypto.randomUUID());
    const entity = new ProductVariantEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new VariantAddedEvent(
        props.productId.value,
        props.productId.value,
        id.value,
        props.sku.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: VariantIdVO,
    props: ProductVariantEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ProductVariantEntity {
    return new ProductVariantEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updatePrice(price: PriceAmountVO): ProductVariantEntity {
    const updated = new ProductVariantEntity(
      this.id,
      { ...this._toProps(), price },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new VariantUpdatedEvent(
        this._productId.value,
        this._productId.value,
        this.id.value,
        ['price'],
        this.version + 1,
      ),
    );
    return updated;
  }

  setDefault(): ProductVariantEntity {
    const updated = new ProductVariantEntity(
      this.id,
      { ...this._toProps(), isDefault: true },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new DefaultVariantSetEvent(
        this._productId.value,
        this._productId.value,
        this.id.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  remove(): ProductVariantEntity {
    const updated = new ProductVariantEntity(
      this.id,
      this._toProps(),
      this.createdAt,
      new Date().toISOString(),
      new Date().toISOString(),
    );
    updated.addDomainEvent(
      new VariantRemovedEvent(
        this._productId.value,
        this._productId.value,
        this.id.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  get productId(): ProductIdVO { return this._productId; }
  get name(): VariantNameVO { return this._name; }
  get sku(): VariantSkuVO { return this._sku; }
  get price(): PriceAmountVO { return this._price; }
  get isDefault(): boolean { return this._isDefault; }

  private _toProps(): ProductVariantEntityProps {
    return {
      productId: this._productId,
      name: this._name,
      sku: this._sku,
      price: this._price,
      isDefault: this._isDefault,
    };
  }
}
