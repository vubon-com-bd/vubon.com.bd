import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PriceIdVO } from '../value-objects/primitives/price-id.vo';
import { PriceAmountVO } from '../value-objects/primitives/price-amount.vo';
import { PriceCurrencyVO } from '../value-objects/primitives/price-currency.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';
import { PriceChangedEvent } from '../events/product-pricing.events';

export interface ProductPricingEntityProps {
  readonly productId: ProductIdVO;
  readonly amount: PriceAmountVO;
  readonly currency: PriceCurrencyVO;
}

export class ProductPricingEntity extends AggregateRoot<PriceIdVO> {
  private readonly _productId: ProductIdVO;
  private readonly _amount: PriceAmountVO;
  private readonly _currency: PriceCurrencyVO;

  private constructor(
    id: PriceIdVO,
    props: ProductPricingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._amount = props.amount;
    this._currency = props.currency;
  }

  static create(props: ProductPricingEntityProps): ProductPricingEntity {
    const now = new Date().toISOString();
    const id = PriceIdVO.create(crypto.randomUUID());
    return new ProductPricingEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: PriceIdVO,
    props: ProductPricingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ProductPricingEntity {
    return new ProductPricingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changeAmount(amount: PriceAmountVO): ProductPricingEntity {
    const updated = new ProductPricingEntity(
      this.id,
      { ...this._toProps(), amount },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new PriceChangedEvent(
        this._productId.value,
        this._productId.value,
        this._amount.value,
        amount.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  get productId(): ProductIdVO { return this._productId; }
  get amount(): PriceAmountVO { return this._amount; }
  get currency(): PriceCurrencyVO { return this._currency; }

  private _toProps(): ProductPricingEntityProps {
    return {
      productId: this._productId,
      amount: this._amount,
      currency: this._currency,
    };
  }
}
