import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { PricingRuleIdVO } from '../value-objects/primitives/pricing-rule-id.vo';
import { PricingRuleTypeVO } from '../value-objects/primitives/pricing-rule-type.vo';
import { PricingRuleValueVO } from '../value-objects/primitives/pricing-rule-value.vo';
import { PriceIdVO } from '../value-objects/primitives/price-id.vo';

export interface ProductPricingRuleEntityProps {
  readonly pricingId: PriceIdVO;
  readonly type: PricingRuleTypeVO;
  readonly value: PricingRuleValueVO;
  readonly isActive: boolean;
}

export class ProductPricingRuleEntity extends BaseEntity<PricingRuleIdVO> {
  private readonly _pricingId: PriceIdVO;
  private readonly _type: PricingRuleTypeVO;
  private readonly _value: PricingRuleValueVO;
  private readonly _isActive: boolean;

  private constructor(
    id: PricingRuleIdVO,
    props: ProductPricingRuleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._pricingId = props.pricingId;
    this._type = props.type;
    this._value = props.value;
    this._isActive = props.isActive;
  }

  static create(props: ProductPricingRuleEntityProps): ProductPricingRuleEntity {
    const now = new Date().toISOString();
    const id = PricingRuleIdVO.create(crypto.randomUUID());
    return new ProductPricingRuleEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: PricingRuleIdVO,
    props: ProductPricingRuleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ProductPricingRuleEntity {
    return new ProductPricingRuleEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  activate(): ProductPricingRuleEntity {
    return new ProductPricingRuleEntity(
      this.id,
      { ...this._toProps(), isActive: true },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  deactivate(): ProductPricingRuleEntity {
    return new ProductPricingRuleEntity(
      this.id,
      { ...this._toProps(), isActive: false },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get pricingId(): PriceIdVO { return this._pricingId; }
  get type(): PricingRuleTypeVO { return this._type; }
  get value(): PricingRuleValueVO { return this._value; }
  get isActive(): boolean { return this._isActive; }

  private _toProps(): ProductPricingRuleEntityProps {
    return {
      pricingId: this._pricingId,
      type: this._type,
      value: this._value,
      isActive: this._isActive,
    };
  }
}
