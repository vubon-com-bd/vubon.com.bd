/**
 * CartCouponEntity — Child of Cart aggregate
 * @module cart-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '../value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../value-objects/primitives/coupon-status.vo.js';
import { CouponDiscountVO } from '../value-objects/primitives/coupon-discount.vo.js';

export interface CartCouponEntityProps {
  readonly cartId: CartIdVO;
  readonly code: CouponCodeVO;
  readonly status: CouponStatusVO;
  readonly discount: CouponDiscountVO;
  readonly appliedDiscountAmount: number;
  readonly currency: string;
  readonly minOrderAmount?: number;
  readonly expiresAt: string;
}

export class CartCouponEntity extends BaseEntity<string> {
  private _status: CartStatusLike;
  private _appliedDiscountAmount: number;
  private _updatedAtInternal: string;

  private readonly _cartId: CartIdVO;
  private readonly _code: CouponCodeVO;
  private readonly _discount: CouponDiscountVO;
  private readonly _currency: string;
  private readonly _minOrderAmount?: number;
  private readonly _expiresAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartCouponEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);

    this._cartId = props.cartId;
    this._code = props.code;
    this._status = props.status;
    this._discount = props.discount;
    this._appliedDiscountAmount = props.appliedDiscountAmount;
    this._currency = props.currency;
    this._minOrderAmount = props.minOrderAmount;
    this._expiresAt = props.expiresAt;
    this._updatedAtInternal = updatedAt;

    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!Number.isFinite(this._appliedDiscountAmount) || this._appliedDiscountAmount < 0) {
      throw new ValidationError(
        'appliedDiscountAmount must be non-negative',
        'appliedDiscountAmount',
      );
    }
    if (this._minOrderAmount !== undefined && this._minOrderAmount < 0) {
      throw new ValidationError('minOrderAmount must be non-negative', 'minOrderAmount');
    }
  }

  get cartId(): CartIdVO { return this._cartId; }
  get code(): CouponCodeVO { return this._code; }
  get status(): CouponStatusVO { return this._status; }
  get discount(): CouponDiscountVO { return this._discount; }
  get appliedDiscountAmount(): number { return this._appliedDiscountAmount; }
  get currency(): string { return this._currency; }
  get minOrderAmount(): number | undefined { return this._minOrderAmount; }
  get expiresAt(): string { return this._expiresAt; }
  get updatedAtInternal(): string { return this._updatedAtInternal; }

  isUsable(): boolean { return this._status.isUsable(); }
  isFinal(): boolean { return this._status.isFinal(); }

  isExpired(at: Date = new Date()): boolean {
    return new Date(this._expiresAt).getTime() <= at.getTime();
  }

  meetsMinOrder(subtotal: number): boolean {
    if (this._minOrderAmount === undefined) return true;
    return subtotal >= this._minOrderAmount;
  }

  canBeApplied(subtotal: number): boolean {
    return this.isUsable() && !this.isExpired() && this.meetsMinOrder(subtotal);
  }

  // Business Actions
  updateAppliedAmount(amount: number, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('appliedDiscountAmount must be non-negative', 'amount');
    }
    this._appliedDiscountAmount = amount;
    this.touch(now);
  }

  disable(now: string = new Date().toISOString()): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        'Cannot disable a final coupon',
        'COUPON_ALREADY_FINAL',
        { code: this._code.value },
      );
    }
    this._status = CouponStatusVO.create('disabled');
    this.touch(now);
  }

  private touch(now: string): void {
    this._updatedAtInternal = now;
  }

  // Factories
  static create(params: {
    id: string;
    props: CartCouponEntityProps;
    now: string;
  }): CartCouponEntity {
    return new CartCouponEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: CartCouponEntityProps;
  }): CartCouponEntity {
    return new CartCouponEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }
}

// alias for internal clarity
type CartStatusLike = CouponStatusVO;
