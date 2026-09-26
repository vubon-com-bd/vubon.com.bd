import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { GuestCartIdVO } from '../value-objects/primitives/guest-cart-id.vo';
import { GuestCartStatusVO } from '../value-objects/primitives/guest-cart-status.vo';
import { GuestTokenVO } from '../value-objects/primitives/guest-token.vo';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';
import { GuestCartMergedEvent } from '../events/guest-cart.events';

export interface GuestCartEntityProps {
  readonly cartId: CartIdVO;
  readonly token: GuestTokenVO;
  readonly status: GuestCartStatusVO;
  readonly itemCount: number;
  readonly expiresAt: Date;
}

export class GuestCartEntity extends AggregateRoot<GuestCartIdVO> {
  private readonly _cartId: CartIdVO;
  private readonly _token: GuestTokenVO;
  private readonly _status: GuestCartStatusVO;
  private readonly _itemCount: number;
  private readonly _expiresAt: Date;

  private constructor(
    id: GuestCartIdVO,
    props: GuestCartEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._token = props.token;
    this._status = props.status;
    this._itemCount = props.itemCount;
    this._expiresAt = props.expiresAt;
  }

  static create(props: GuestCartEntityProps): GuestCartEntity {
    const now = new Date().toISOString();
    const id = GuestCartIdVO.create(crypto.randomUUID());
    return new GuestCartEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: GuestCartIdVO,
    props: GuestCartEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): GuestCartEntity {
    return new GuestCartEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markMerged(userId: string): GuestCartEntity {
    const now = new Date().toISOString();
    const updated = new GuestCartEntity(
      this.id,
      { ...this._toProps(), status: GuestCartStatusVO.create('merged') },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new GuestCartMergedEvent(this.id.value, this._cartId.value, userId, this.version + 1),
    );
    return updated;
  }

  get cartId(): CartIdVO { return this._cartId; }
  get token(): GuestTokenVO { return this._token; }
  get status(): GuestCartStatusVO { return this._status; }
  get itemCount(): number { return this._itemCount; }
  get expiresAt(): Date { return this._expiresAt; }

  private _toProps(): GuestCartEntityProps {
    return {
      cartId: this._cartId,
      token: this._token,
      status: this._status,
      itemCount: this._itemCount,
      expiresAt: this._expiresAt,
    };
  }
}
