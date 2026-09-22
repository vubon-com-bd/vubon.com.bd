import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { CartTaxIdVO } from '../value-objects/primitives/cart-tax-id.vo';
import { CartTaxRateVO } from '../value-objects/primitives/cart-tax-rate.vo';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';

export interface CartTaxEntityProps {
  readonly cartId: CartIdVO;
  readonly name: string;
  readonly rate: CartTaxRateVO;
  readonly amount: number;
  readonly currency: string;
}

export class CartTaxEntity extends BaseEntity<CartTaxIdVO> {
  private readonly _cartId: CartIdVO;
  private readonly _name: string;
  private readonly _rate: CartTaxRateVO;
  private readonly _amount: number;
  private readonly _currency: string;

  private constructor(
    id: CartTaxIdVO,
    props: CartTaxEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._name = props.name;
    this._rate = props.rate;
    this._amount = props.amount;
    this._currency = props.currency;
  }

  static create(props: CartTaxEntityProps): CartTaxEntity {
    const now = new Date().toISOString();
    const id = CartTaxIdVO.create(crypto.randomUUID());
    return new CartTaxEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: CartTaxIdVO,
    props: CartTaxEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CartTaxEntity {
    return new CartTaxEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get cartId(): CartIdVO { return this._cartId; }
  get name(): string { return this._name; }
  get rate(): CartTaxRateVO { return this._rate; }
  get amount(): number { return this._amount; }
  get currency(): string { return this._currency; }
}
