/**
 * CartTaxEntity — child entity of Cart aggregate
 * @module cart-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CartTaxIdVO } from '../value-objects/primitives/cart-tax-id.vo.js';
import { CartTaxRateVO } from '../value-objects/primitives/cart-tax-rate.vo.js';

export interface CartTaxEntityProps {
  readonly cartId: CartIdVO;
  readonly rate: CartTaxRateVO;
  readonly inclusive: boolean;
  readonly region?: string;
}

export class CartTaxEntity extends BaseEntity<string> {
  private _rate: CartTaxRateVO;
  private _inclusive: boolean;
  private readonly _cartId: CartIdVO;
  private readonly _region?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartTaxEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._rate = props.rate;
    this._inclusive = props.inclusive;
    this._region = props.region;
  }

  get cartId(): CartIdVO { return this._cartId; }
  get rate(): CartTaxRateVO { return this._rate; }
  get inclusive(): boolean { return this._inclusive; }
  get region(): string | undefined { return this._region; }
  get toIdVO(): CartTaxIdVO { return CartTaxIdVO.reconstitute(this.id); }

  computeTax(taxableAmount: number): number {
    if (taxableAmount < 0) {
      throw new ValidationError('Taxable amount cannot be negative', 'taxableAmount');
    }
    return this._rate.applyOn(taxableAmount);
  }

  changeRate(rate: CartTaxRateVO, now: string): void {
    this._rate = rate;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  changeInclusion(inclusive: boolean, now: string): void {
    this._inclusive = inclusive;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: CartTaxEntityProps;
    now: string;
  }): CartTaxEntity {
    return new CartTaxEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: CartTaxEntityProps;
  }): CartTaxEntity {
    return new CartTaxEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
