/**
 * CartTaxEntity — Child of Cart aggregate
 * @module cart-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CartTaxIdVO } from '../value-objects/primitives/cart-tax-id.vo.js';
import { CartTaxRateVO } from '../value-objects/primitives/cart-tax-rate.vo.js';

export interface CartTaxEntityProps {
  readonly cartId: CartIdVO;
  readonly taxId: CartTaxIdVO;
  readonly rate: CartTaxRateVO;
  readonly label: string;
  readonly inclusive: boolean;
  readonly taxAmount: number;
  readonly currency: string;
}

export class CartTaxEntity extends BaseEntity<string> {
  private _rate: CartTaxRateVO;
  private _taxAmount: number;
  private _updatedAtInternal: string;

  private readonly _cartId: CartIdVO;
  private readonly _taxId: CartTaxIdVO;
  private readonly _label: string;
  private readonly _inclusive: boolean;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartTaxEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._cartId = props.cartId;
    this._taxId = props.taxId;
    this._rate = props.rate;
    this._label = props.label;
    this._inclusive = props.inclusive;
    this._taxAmount = props.taxAmount;
    this._currency = props.currency;
    this._updatedAtInternal = updatedAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._label.trim().length === 0) {
      throw new ValidationError('label cannot be empty', 'label');
    }
    if (!Number.isFinite(this._taxAmount) || this._taxAmount < 0) {
      throw new ValidationError('taxAmount must be non-negative', 'taxAmount');
    }
  }

  get cartId(): CartIdVO { return this._cartId; }
  get taxId(): CartTaxIdVO { return this._taxId; }
  get rate(): CartTaxRateVO { return this._rate; }
  get label(): string { return this._label; }
  get inclusive(): boolean { return this._inclusive; }
  get taxAmount(): number { return this._taxAmount; }
  get currency(): string { return this._currency; }
  get updatedAtInternal(): string { return this._updatedAtInternal; }

  isInclusive(): boolean { return this._inclusive; }
  isExclusive(): boolean { return !this._inclusive; }
  isZero(): boolean { return this._rate.isZero(); }

  recalculate(baseAmount: number, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(baseAmount) || baseAmount < 0) {
      throw new ValidationError('baseAmount must be non-negative', 'baseAmount');
    }
    this._taxAmount = this._rate.calculate(baseAmount);
    this.touch(now);
  }

  changeRate(rate: CartTaxRateVO, now: string = new Date().toISOString()): void {
    this._rate = rate;
    this.touch(now);
  }

  private touch(now: string): void {
    this._updatedAtInternal = now;
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
    props: CartTaxEntityProps;
  }): CartTaxEntity {
    return new CartTaxEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }
}
