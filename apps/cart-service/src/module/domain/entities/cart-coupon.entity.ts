/**
 * CartCouponEntity — Aggregate Root for an applied coupon
 * @module cart-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { COUPON_STATUS } from '@vubon/shared-constants/business/cart';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '../value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../value-objects/primitives/coupon-status.vo.js';
import {
  CouponAppliedEvent,
  CouponRemovedEvent,
  CouponInvalidatedEvent,
} from '../events/coupon.events.js';

export interface CartCouponEntityProps {
  readonly cartId: CartIdVO;
  readonly code: CouponCodeVO;
  readonly status: CouponStatusVO;
  readonly discountAmount: number;
  readonly currency: string;
  readonly appliedAt: string;
}

export class CartCouponEntity extends AggregateRoot<string> {
  private _status: CouponStatusVO;
  private readonly _cartId: CartIdVO;
  private readonly _code: CouponCodeVO;
  private _discountAmount: number;
  private readonly _currency: string;
  private readonly _appliedAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartCouponEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._code = props.code;
    this._status = props.status;
    this._discountAmount = props.discountAmount;
    this._currency = props.currency;
    this._appliedAt = props.appliedAt;
  }

  get cartId(): CartIdVO { return this._cartId; }
  get code(): CouponCodeVO { return this._code; }
  get status(): CouponStatusVO { return this._status; }
  get discountAmount(): number { return this._discountAmount; }
  get currency(): string { return this._currency; }
  get appliedAt(): string { return this._appliedAt; }

  isActive(): boolean {
    return this._status.isUsable();
  }

  invalidate(reason: string, now: string): void {
    if (!this.isActive()) return;
    this._status = CouponStatusVO.create(COUPON_STATUS.EXPIRED);
    this.addDomainEvent(
      new CouponInvalidatedEvent({
        aggregateId: this._cartId.value,
        payload: { cartId: this._cartId.value, code: this._code.value, reason },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  remove(
    removedBy?: string,
    reason?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.addDomainEvent(
      new CouponRemovedEvent({
        aggregateId: this._cartId.value,
        payload: {
          cartId: this._cartId.value,
          code: this._code.value,
          removedBy,
          reason,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: CartCouponEntityProps;
    now: string;
    appliedBy?: string;
  }): CartCouponEntity {
    const entity = new CartCouponEntity(
      params.id,
      params.now,
      params.now,
      params.props,
    );
    entity.addDomainEvent(
      new CouponAppliedEvent({
        aggregateId: params.props.cartId.value,
        payload: {
          cartId: params.props.cartId.value,
          code: params.props.code.value,
          discountAmount: params.props.discountAmount,
          currency: params.props.currency,
          appliedBy: params.appliedBy,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: CartCouponEntityProps;
    version?: number;
  }): CartCouponEntity {
    const entity = new CartCouponEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
