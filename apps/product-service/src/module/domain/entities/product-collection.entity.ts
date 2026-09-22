import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { CollectionIdVO } from '../value-objects/primitives/collection-id.vo';
import { CollectionNameVO } from '../value-objects/primitives/collection-name.vo';
import { CollectionTypeVO } from '../value-objects/primitives/collection-type.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export interface ProductCollectionEntityProps {
  readonly name: CollectionNameVO;
  readonly type: CollectionTypeVO;
  readonly productIds: readonly ProductIdVO[];
}

export class ProductCollectionEntity extends BaseEntity<CollectionIdVO> {
  private readonly _name: CollectionNameVO;
  private readonly _type: CollectionTypeVO;
  private readonly _productIds: readonly ProductIdVO[];

  private constructor(
    id: CollectionIdVO,
    props: ProductCollectionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._productIds = Object.freeze([...props.productIds]);
  }

  static create(props: ProductCollectionEntityProps): ProductCollectionEntity {
    const now = new Date().toISOString();
    const id = CollectionIdVO.create(crypto.randomUUID());
    return new ProductCollectionEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: CollectionIdVO,
    props: ProductCollectionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ProductCollectionEntity {
    return new ProductCollectionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  addProduct(productId: ProductIdVO): ProductCollectionEntity {
    if (this._productIds.some((p) => p.value === productId.value)) {
      return this;
    }
    return new ProductCollectionEntity(
      this.id,
      { ...this._toProps(), productIds: [...this._productIds, productId] },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  removeProduct(productId: ProductIdVO): ProductCollectionEntity {
    return new ProductCollectionEntity(
      this.id,
      {
        ...this._toProps(),
        productIds: this._productIds.filter((p) => p.value !== productId.value),
      },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get name(): CollectionNameVO { return this._name; }
  get type(): CollectionTypeVO { return this._type; }
  get productIds(): readonly ProductIdVO[] { return this._productIds; }

  private _toProps(): ProductCollectionEntityProps {
    return {
      name: this._name,
      type: this._type,
      productIds: this._productIds,
    };
  }
}
