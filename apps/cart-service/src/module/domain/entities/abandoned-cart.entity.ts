/**
 * AbandonedCartEntity — Aggregate Root
 * @module cart-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ABANDONED_CART, ABANDONED_CART_STATUS } from '@vubon/shared-constants/business/cart';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { AbandonedCartIdVO } from '../value-objects/primitives/abandoned-cart-id.vo.js';
import { AbandonedCartStatusVO } from '../value-objects/primitives/abandoned-cart-status.vo.js';
import { AbandonedCartReminderVO } from '../value-objects/primitives/abandoned-cart-reminder.vo.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CartUserIdVO } from '../value-objects/primitives/user-id.vo.js';
import {
  AbandonedCartDetectedEvent,
  ReminderSentEvent,
  AbandonedCartRecoveredEvent,
  AbandonedCartLostEvent,
  AbandonedCartUnsubscribedEvent,
} from '../events/abandoned-cart.events.js';

export interface AbandonedCartEntityProps {
  readonly cartId: CartIdVO;
  readonly userId?: CartUserIdVO;
  readonly email?: string;
  readonly status: AbandonedCartStatusVO;
  readonly reminderType: AbandonedCartReminderVO;
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly abandonedAt: string;
  readonly remindersSent: number;
  readonly lastReminderAt?: string;
  readonly recoveredAt?: string;
  readonly recoveredOrderId?: string;
}

export class AbandonedCartEntity extends AggregateRoot<string> {
  private _status: AbandonedCartStatusVO;
  private _remindersSent: number;
  private _lastReminderAt?: string;
  private _recoveredAt?: string;
  private _recoveredOrderId?: string;
  private readonly _cartId: CartIdVO;
  private readonly _userId?: CartUserIdVO;
  private readonly _email?: string;
  private readonly _reminderType: AbandonedCartReminderVO;
  private readonly _itemCount: number;
  private readonly _cartValue: number;
  private readonly _currency: string;
  private readonly _abandonedAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: AbandonedCartEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._userId = props.userId;
    this._email = props.email;
    this._status = props.status;
    this._reminderType = props.reminderType;
    this._itemCount = props.itemCount;
    this._cartValue = props.cartValue;
    this._currency = props.currency;
    this._abandonedAt = props.abandonedAt;
    this._remindersSent = props.remindersSent;
    this._lastReminderAt = props.lastReminderAt;
    this._recoveredAt = props.recoveredAt;
    this._recoveredOrderId = props.recoveredOrderId;

    if (this._itemCount <= 0) {
      throw new ValidationError('Abandoned cart must have items', 'itemCount');
    }
    if (this._cartValue <= 0) {
      throw new ValidationError('Abandoned cart value must be positive', 'cartValue');
    }
    if (this._remindersSent < 0 || this._remindersSent > ABANDONED_CART.MAX_REMINDERS) {
      throw new ValidationError(
        `remindersSent must be 0..${ABANDONED_CART.MAX_REMINDERS}`,
        'remindersSent',
      );
    }
  }

  get cartId(): CartIdVO { return this._cartId; }
  get userId(): CartUserIdVO | undefined { return this._userId; }
  get email(): string | undefined { return this._email; }
  get status(): AbandonedCartStatusVO { return this._status; }
  get reminderType(): AbandonedCartReminderVO { return this._reminderType; }
  get itemCount(): number { return this._itemCount; }
  get cartValue(): number { return this._cartValue; }
  get currency(): string { return this._currency; }
  get abandonedAt(): string { return this._abandonedAt; }
  get remindersSent(): number { return this._remindersSent; }
  get lastReminderAt(): string | undefined { return this._lastReminderAt; }
  get recoveredAt(): string | undefined { return this._recoveredAt; }
  get recoveredOrderId(): string | undefined { return this._recoveredOrderId; }
  get toIdVO(): AbandonedCartIdVO { return AbandonedCartIdVO.reconstitute(this.id); }

  isRecovered(): boolean {
    return this._status.isRecovered();
  }

  canSendAnotherReminder(): boolean {
    return (
      this._status.canSendReminder() &&
      this._remindersSent < ABANDONED_CART.MAX_REMINDERS &&
      !this._reminderType.isDisabled()
    );
  }

  sendReminder(channel: string, now: string): number {
    if (!this.canSendAnotherReminder()) {
      throw new BusinessRuleError(
        `Cannot send more reminders for abandoned cart "${this.id}"`,
        'ABANDONED_REMINDER_LIMIT',
        { id: this.id, sent: this._remindersSent },
      );
    }
    this._remindersSent += 1;
    this._lastReminderAt = now;
    this._status = AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.REMINDED);
    this.addDomainEvent(
      new ReminderSentEvent({
        aggregateId: this.id,
        payload: {
          abandonedCartId: this.id,
          cartId: this._cartId.value,
          reminderType: this._reminderType.value,
          channel,
          reminderNumber: this._remindersSent,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    return this._remindersSent;
  }

  recover(orderId: string, recoveredValue: number, now: string): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        `Abandoned cart "${this.id}" is already in final state`,
        'ABANDONED_CART_FINAL',
        { id: this.id, status: this._status.value },
      );
    }
    this._status = AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.RECOVERED);
    this._recoveredAt = now;
    this._recoveredOrderId = orderId;
    this.addDomainEvent(
      new AbandonedCartRecoveredEvent({
        aggregateId: this.id,
        payload: {
          abandonedCartId: this.id,
          cartId: this._cartId.value,
          orderId,
          recoveredValue,
          currency: this._currency,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  markLost(reason: string, now: string): void {
    if (this._status.isFinal()) return;
    this._status = AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.LOST);
    this.addDomainEvent(
      new AbandonedCartLostEvent({
        aggregateId: this.id,
        payload: {
          abandonedCartId: this.id,
          cartId: this._cartId.value,
          reason,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  unsubscribe(now: string): void {
    if (this._status.isFinal()) return;
    this._status = AbandonedCartStatusVO.create(ABANDONED_CART_STATUS.UNSUBSCRIBED);
    this.addDomainEvent(
      new AbandonedCartUnsubscribedEvent({
        aggregateId: this.id,
        payload: {
          abandonedCartId: this.id,
          cartId: this._cartId.value,
          userId: this._userId?.value,
          email: this._email,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: AbandonedCartEntityProps;
    now: string;
  }): AbandonedCartEntity {
    const entity = new AbandonedCartEntity(
      params.id,
      params.now,
      params.now,
      params.props,
    );
    entity.addDomainEvent(
      new AbandonedCartDetectedEvent({
        aggregateId: params.id,
        payload: {
          abandonedCartId: params.id,
          cartId: params.props.cartId.value,
          userId: params.props.userId?.value,
          itemCount: params.props.itemCount,
          cartValue: params.props.cartValue,
          currency: params.props.currency,
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
    props: AbandonedCartEntityProps;
    version?: number;
  }): AbandonedCartEntity {
    const entity = new AbandonedCartEntity(
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
