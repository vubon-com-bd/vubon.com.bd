import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CouponCodeVO } from '../value-objects/primitives/coupon-code.vo';
import { CouponDiscountVO } from '../value-objects/primitives/coupon-discount.vo';
import { CouponStatusVO } from '../value-objects/primitives/coupon-status.vo';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';
import {
  CouponAppliedEvent,
  CouponRemovedEvent,
} from '../events/coupon.events';

export interface CartCouponEntityProps {
  readonly cartId: CartIdVO;
  readonly code: CouponCodeVO;
  readonly discount: CouponDiscountVO;
  readonly status: CouponStatusVO;
}

export class CartCouponEntity extends AggregateRoot<string> {
  private readonly _cartId: CartIdVO;
  private readonly _code: CouponCodeVO;
  private readonly _discount: CouponDiscountVO;
  private readonly _status: CouponStatusVO;

  private constructor(
    id: string,
    props: CartCouponEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._code = props.code;
    this._discount = props.discount;
    this._status = props.status;
  }

  static create(props: CartCouponEntityProps): CartCouponEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const entity = new CartCouponEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new CouponAppliedEvent(props.cartId.value, props.code.value, props.discount.discount, 0),
    );
    return entity;
  }

  static reconstitute(
    id: string,
    props: CartCouponEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CartCouponEntity {
    return new CartCouponEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  remove(): CartCouponEntity {
    const now = new Date().toISOString();
    const updated = new CartCouponEntity(
      this.id,
      { ...this._toProps(), status: CouponStatusVO.create('removed') },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new CouponRemovedEvent(this._cartId.value, this._code.value, this.version + 1),
    );
    return updated;
  }

  get cartId(): CartIdVO { return this._cartId; }
  get code(): CouponCodeVO { return this._code; }
  get discount(): CouponDiscountVO { return this._discount; }
  get status(): CouponStatusVO { return this._status; }

  private _toProps(): CartCouponEntityProps {
    return {
      cartId: this._cartId,
      code: this._code,
      discount: this._discount,
      status: this._status,
    };
  }
}
