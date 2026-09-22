import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { AttributeIdVO } from '../value-objects/primitives/attribute-id.vo';
import { AttributeNameVO } from '../value-objects/primitives/attribute-name.vo';
import { AttributeValueVO } from '../value-objects/primitives/attribute-value.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export interface ProductAttributeEntityProps {
  readonly productId: ProductIdVO;
  readonly name: AttributeNameVO;
  readonly value: AttributeValueVO;
}

export class ProductAttributeEntity extends BaseEntity<AttributeIdVO> {
  private readonly _productId: ProductIdVO;
  private readonly _name: AttributeNameVO;
  private readonly _value: AttributeValueVO;

  private constructor(
    id: AttributeIdVO,
    props: ProductAttributeEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._name = props.name;
    this._value = props.value;
  }

  static create(props: ProductAttributeEntityProps): ProductAttributeEntity {
    const now = new Date().toISOString();
    const id = AttributeIdVO.create(crypto.randomUUID());
    return new ProductAttributeEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: AttributeIdVO,
    props: ProductAttributeEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ProductAttributeEntity {
    return new ProductAttributeEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateValue(value: AttributeValueVO): ProductAttributeEntity {
    return new ProductAttributeEntity(
      this.id,
      { ...this._toProps(), value },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get productId(): ProductIdVO { return this._productId; }
  get name(): AttributeNameVO { return this._name; }
  get value(): AttributeValueVO { return this._value; }

  private _toProps(): ProductAttributeEntityProps {
    return {
      productId: this._productId,
      name: this._name,
      value: this._value,
    };
  }
}
