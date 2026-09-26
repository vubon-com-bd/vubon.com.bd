import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { AbandonedCartIdVO } from '../value-objects/primitives/abandoned-cart-id.vo';
import { AbandonedCartStatusVO } from '../value-objects/primitives/abandoned-cart-status.vo';
import { AbandonedCartReminderVO } from '../value-objects/primitives/abandoned-cart-reminder.vo';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  CartAbandonedEvent,
  CartRecoveredEvent,
} from '../events/abandoned-cart.events';

export interface AbandonedCartEntityProps {
  readonly cartId: CartIdVO;
  readonly userId: UserIdVO | null;
  readonly itemCount: number;
  readonly subtotalAmount: number;
  readonly currency: string;
  readonly status: AbandonedCartStatusVO;
  readonly reminder: AbandonedCartReminderVO;
  readonly abandonedAt: Date;
  readonly recoveredAt: Date | null;
}

export class AbandonedCartEntity extends AggregateRoot<AbandonedCartIdVO> {
  private readonly _cartId: CartIdVO;
  private readonly _userId: UserIdVO | null;
  private readonly _itemCount: number;
  private readonly _subtotalAmount: number;
  private readonly _currency: string;
  private readonly _status: AbandonedCartStatusVO;
  private readonly _reminder: AbandonedCartReminderVO;
  private readonly _abandonedAt: Date;
  private readonly _recoveredAt: Date | null;

  private constructor(
    id: AbandonedCartIdVO,
    props: AbandonedCartEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._userId = props.userId;
    this._itemCount = props.itemCount;
    this._subtotalAmount = props.subtotalAmount;
    this._currency = props.currency;
    this._status = props.status;
    this._reminder = props.reminder;
    this._abandonedAt = props.abandonedAt;
    this._recoveredAt = props.recoveredAt;
  }

  static create(props: AbandonedCartEntityProps): AbandonedCartEntity {
    const now = new Date().toISOString();
    const id = AbandonedCartIdVO.create(crypto.randomUUID());
    const entity = new AbandonedCartEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new CartAbandonedEvent(id.value, props.cartId.value, props.userId?.value ?? null, props.itemCount, 0),
    );
    return entity;
  }

  static reconstitute(
    id: AbandonedCartIdVO,
    props: AbandonedCartEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AbandonedCartEntity {
    return new AbandonedCartEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markRecovered(): AbandonedCartEntity {
    const now = new Date();
    const updated = new AbandonedCartEntity(
      this.id,
      {
        ...this._toProps(),
        status: AbandonedCartStatusVO.create('recovered'),
        recoveredAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new CartRecoveredEvent(this.id.value, this._cartId.value, this.version + 1),
    );
    return updated;
  }

  get cartId(): CartIdVO { return this._cartId; }
  get userId(): UserIdVO | null { return this._userId; }
  get itemCount(): number { return this._itemCount; }
  get subtotalAmount(): number { return this._subtotalAmount; }
  get currency(): string { return this._currency; }
  get status(): AbandonedCartStatusVO { return this._status; }
  get reminder(): AbandonedCartReminderVO { return this._reminder; }
  get abandonedAt(): Date { return this._abandonedAt; }
  get recoveredAt(): Date | null { return this._recoveredAt; }

  private _toProps(): AbandonedCartEntityProps {
    return {
      cartId: this._cartId,
      userId: this._userId,
      itemCount: this._itemCount,
      subtotalAmount: this._subtotalAmount,
      currency: this._currency,
      status: this._status,
      reminder: this._reminder,
      abandonedAt: this._abandonedAt,
      recoveredAt: this._recoveredAt,
    };
  }
}
