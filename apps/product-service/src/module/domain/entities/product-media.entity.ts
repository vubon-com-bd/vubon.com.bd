import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export type MediaType = 'image' | 'video' | 'document';

export interface ProductMediaEntityProps {
  readonly productId: ProductIdVO;
  readonly url: string;
  readonly type: MediaType;
  readonly order: number;
}

export class ProductMediaEntity extends BaseEntity<string> {
  private readonly _productId: ProductIdVO;
  private readonly _url: string;
  private readonly _type: MediaType;
  private readonly _order: number;

  private constructor(
    id: string,
    props: ProductMediaEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._url = props.url;
    this._type = props.type;
    this._order = props.order;
  }

  static create(props: ProductMediaEntityProps): ProductMediaEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new ProductMediaEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: ProductMediaEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ProductMediaEntity {
    return new ProductMediaEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  reorder(order: number): ProductMediaEntity {
    return new ProductMediaEntity(
      this.id,
      { ...this._toProps(), order },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get productId(): ProductIdVO { return this._productId; }
  get url(): string { return this._url; }
  get type(): MediaType { return this._type; }
  get order(): number { return this._order; }

  private _toProps(): ProductMediaEntityProps {
    return {
      productId: this._productId,
      url: this._url,
      type: this._type,
      order: this._order,
    };
  }
}
