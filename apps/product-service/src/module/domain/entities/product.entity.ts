import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';
import { ProductNameVO } from '../value-objects/primitives/product-name.vo';
import { ProductSlugVO } from '../value-objects/primitives/product-slug.vo';
import { ProductSkuVO } from '../value-objects/primitives/product-sku.vo';
import { ProductStatusVO } from '../value-objects/primitives/product-status.vo';
import { ProductTypeVO } from '../value-objects/primitives/product-type.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { CategoryIdVO } from '../value-objects/primitives/category-id.vo';
import { BrandIdVO } from '../value-objects/primitives/brand-id.vo';
import {
  ProductCreatedEvent,
  ProductUpdatedEvent,
  ProductDeletedEvent,
  ProductPublishedEvent,
  ProductArchivedEvent,
} from '../events/product.events';

export interface ProductEntityProps {
  readonly name: ProductNameVO;
  readonly slug: ProductSlugVO;
  readonly sku: ProductSkuVO;
  readonly status: ProductStatusVO;
  readonly type: ProductTypeVO;
  readonly vendorId: VendorIdVO;
  readonly categoryId: CategoryIdVO | null;
  readonly brandId: BrandIdVO | null;
}

export class ProductEntity extends AggregateRoot<ProductIdVO> {
  private readonly _name: ProductNameVO;
  private readonly _slug: ProductSlugVO;
  private readonly _sku: ProductSkuVO;
  private readonly _status: ProductStatusVO;
  private readonly _type: ProductTypeVO;
  private readonly _vendorId: VendorIdVO;
  private readonly _categoryId: CategoryIdVO | null;
  private readonly _brandId: BrandIdVO | null;

  private constructor(
    id: ProductIdVO,
    props: ProductEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._slug = props.slug;
    this._sku = props.sku;
    this._status = props.status;
    this._type = props.type;
    this._vendorId = props.vendorId;
    this._categoryId = props.categoryId;
    this._brandId = props.brandId;
  }

  static create(props: ProductEntityProps): ProductEntity {
    const now = new Date().toISOString();
    const id = ProductIdVO.create(crypto.randomUUID());
    const entity = new ProductEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new ProductCreatedEvent(id.value, id.value, props.vendorId.value, props.slug.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: ProductIdVO,
    props: ProductEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ProductEntity {
    return new ProductEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changeName(name: ProductNameVO): ProductEntity {
    const updated = new ProductEntity(
      this.id,
      { ...this._toProps(), name },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ProductUpdatedEvent(this.id.value, this.id.value, ['name'], this.version + 1),
    );
    return updated;
  }

  changeStatus(status: ProductStatusVO): ProductEntity {
    const updated = new ProductEntity(
      this.id,
      { ...this._toProps(), status },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ProductUpdatedEvent(this.id.value, this.id.value, ['status'], this.version + 1),
    );
    return updated;
  }

  publish(): ProductEntity {
    const updated = new ProductEntity(
      this.id,
      { ...this._toProps(), status: ProductStatusVO.create('published') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ProductPublishedEvent(this.id.value, this.id.value, this._slug.value, this.version + 1),
    );
    return updated;
  }

  archive(): ProductEntity {
    const updated = new ProductEntity(
      this.id,
      { ...this._toProps(), status: ProductStatusVO.create('archived') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ProductArchivedEvent(this.id.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  softDelete(): ProductEntity {
    const now = new Date().toISOString();
    const updated = new ProductEntity(
      this.id,
      this._toProps(),
      this.createdAt,
      now,
      now,
    );
    updated.addDomainEvent(
      new ProductDeletedEvent(this.id.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  get name(): ProductNameVO { return this._name; }
  get slug(): ProductSlugVO { return this._slug; }
  get sku(): ProductSkuVO { return this._sku; }
  get status(): ProductStatusVO { return this._status; }
  get type(): ProductTypeVO { return this._type; }
  get vendorId(): VendorIdVO { return this._vendorId; }
  get categoryId(): CategoryIdVO | null { return this._categoryId; }
  get brandId(): BrandIdVO | null { return this._brandId; }

  canPublish(): boolean {
    return this._status.isDraft();
  }

  private _toProps(): ProductEntityProps {
    return {
      name: this._name,
      slug: this._slug,
      sku: this._sku,
      status: this._status,
      type: this._type,
      vendorId: this._vendorId,
      categoryId: this._categoryId,
      brandId: this._brandId,
    };
  }
}
