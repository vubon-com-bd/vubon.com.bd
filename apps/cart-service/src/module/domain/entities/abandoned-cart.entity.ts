/**
 * AbandonedCartEntity — Aggregate Root (independent)
 * @module cart-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { AbandonedCartIdVO } from '../value-objects/primitives/abandoned-cart-id.vo.js';
import { AbandonedCartStatusVO } from '../value-objects/primitives/abandoned-cart-status.vo.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

import {
  AbandonedCartDetectedEvent,
  AbandonedCartReminderSentEvent,
  AbandonedCartRecoveredEvent,
  AbandonedCartLostEvent,
  AbandonedCartUnsubscribedEvent,
  AbandonedCartStatusChangedEvent,
} from '../events/abandoned-cart.events.js';

const MAX_REMINDERS = 4;

export interface AbandonedCartEntityProps {
  readonly cartId: CartIdVO;
  readonly userId?: UserIdVO;
  readonly email?: string;
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly abandonedAt: string;
  readonly remindersSent: number;
  readonly lastReminderAt?: string;
  readonly recoveredAt?: string;
  readonly recoveredOrderId?: string;
  readonly recoveryDiscountPercent?: number;
}

export class AbandonedCartEntity extends AggregateRoot<string> {
  private _status: AbandonedCartStatusVO;
  private _remindersSent: number;
  private _lastReminderAt?: string;
  private _recoveredAt?: string;
  private _recoveredOrderId?: string;

  private readonly _cartId: CartIdVO;
  private readonly _userId?: UserIdVO;
  private readonly _email?: string;
  private readonly _itemCount: number;
  private readonly _cartValue: number;
  private readonly _currency: string;
  private readonly _abandonedAt: string;
  private readonly _recoveryDiscountPercent?: number;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: AbandonedCartEntityProps,
    status: AbandonedCartStatusVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._userId = props.userId;
    this._email = props.email;
    this._itemCount = props.itemCount;
    this._cartValue = props.cartValue;
    this._currency = props.currency;
    this._abandonedAt = props.abandonedAt;
    this._remindersSent = props.remindersSent;
    this._lastReminderAt = props.lastReminderAt;
    this._recoveredAt = props.recoveredAt;
    this._recoveredOrderId = props.recoveredOrderId;
    this._recoveryDiscountPercent = props.recoveryDiscountPercent;
    this._status = status;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!Number.isInteger(this._itemCount) || this._itemCount < 0) {
      throw new ValidationError('itemCount must be non-negative integer', 'itemCount');
    }
    if (!Number.isFinite(this._cartValue) || this._cartValue < 0) {
      throw new ValidationError('cartValue must be non-negative', 'cartValue');
    }
    if (!Number.isInteger(this._remindersSent) || this._remindersSent < 0) {
      throw new ValidationError(
        'remindersSent must be non-negative integer',
        'remindersSent',
      );
    }
  }

  get cartId(): CartIdVO { return this._cartId; }
  get userId(): UserIdVO | undefined { return this._userId; }
  get email(): string | undefined { return this._email; }
  get itemCount(): number { return this._itemCount; }
  get cartValue(): number { return this._cartValue; }
  get currency(): string { return this._currency; }
  get abandonedAt(): string { return this._abandonedAt; }
  get status(): AbandonedCartStatusVO { return this._status; }
  get remindersSent(): number { return this._remindersSent; }
  get lastReminderAt(): string | undefined { return this._lastReminderAt; }
  get recoveredAt(): string | undefined { return this._recoveredAt; }
  get recoveredOrderId(): string | undefined { return this._recoveredOrderId; }
  get recoveryDiscountPercent(): number | undefined { return this._recoveryDiscountPercent; }

  get toIdVO(): AbandonedCartIdVO {
    return AbandonedCartIdVO.reconstitute(this.id);
  }

  isPending(): boolean { return this._status.isPending(); }
  isReminded(): boolean { return this._status.isReminded(); }
  isRecovered(): boolean { return this._status.isRecovered(); }
  isLost(): boolean { return this._status.isLost(); }
  isUnsubscribed(): boolean { return this._status.isUnsubscribed(); }
  isRecoverable(): boolean { return this._status.isRecoverable(); }
  isFinal(): boolean { return this._status.isFinal(); }

  canSendReminder(): boolean {
    return this.isRecoverable() && this._remindersSent < MAX_REMINDERS;
  }

  hasEmail(): boolean {
    return this._email !== undefined && this._email.length > 0;
  }

  // Business Actions
  sendReminder(
    channel: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canSendReminder()) {
      throw new BusinessRuleError(
        `Reminder limit exceeded for abandoned cart "${this.id}"`,
        'REMINDER_LIMIT_EXCEEDED',
        { id: this.id, max: MAX_REMINDERS },
      );
    }
    const from = this._status.value;
    this._remindersSent += 1;
    this._lastReminderAt = now;
    this._status = AbandonedCartStatusVO.create('reminded');
    this.addDomainEvent(
      new AbandonedCartReminderSentEvent({
        aggregateId: this.id,
        payload: {
          abandonedCartId: this.id,
          channel,
          sentAt: now,
          remindersSent: this._remindersSent,
        },
        version: this.version + 1,
      }),
    );
    if (from !== 'reminded') {
      this.addDomainEvent(
        new AbandonedCartStatusChangedEvent({
          aggregateId: this.id,
          payload: { abandonedCartId: this.id, fromStatus: from, toStatus: 'reminded' },
          version: this.version + 1,
        }),
      );
    }
    this.touch(now);
    this.incrementVersion();
  }

  recover(orderId: string, now: string = new Date().toISOString()): void {
    if (!this.isRecoverable()) {
      throw new BusinessRuleError(
        `Abandoned cart "${this.id}" not recoverable in status "${this._status.value}"`,
        'ABANDONED_CART_NOT_RECOVERABLE',
        { id: this.id, status: this._status.value },
      );
    }
    const from = this._status.value;
    this._status = AbandonedCartStatusVO.create('recovered');
    this._recoveredAt = now;
    this._recoveredOrderId = orderId;
    this.addDomainEvent(
      new AbandonedCartRecoveredEvent({
        aggregateId: this.id,
        payload: {
          abandonedCartId: this.id,
          orderId,
          recoveredAt: now,
          recoveredValue: this._cartValue,
        },
        version: this.version + 1,
      }),
    );
    this.addDomainEvent(
      new AbandonedCartStatusChangedEvent({
        aggregateId: this.id,
        payload: { abandonedCartId: this.id, fromStatus: from, toStatus: 'recovered' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markLost(reason: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) return;
    const from = this._status.value;
    this._status = AbandonedCartStatusVO.create('lost');
    this.addDomainEvent(
      new AbandonedCartLostEvent({
        aggregateId: this.id,
        payload: { abandonedCartId: this.id, lostAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.addDomainEvent(
      new AbandonedCartStatusChangedEvent({
        aggregateId: this.id,
        payload: { abandonedCartId: this.id, fromStatus: from, toStatus: 'lost' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  unsubscribe(now: string = new Date().toISOString()): void {
    if (this.isUnsubscribed()) return;
    const from = this._status.value;
    this._status = AbandonedCartStatusVO.create('unsubscribed');
    this.addDomainEvent(
      new AbandonedCartUnsubscribedEvent({
        aggregateId: this.id,
        payload: { abandonedCartId: this.id, unsubscribedAt: now },
        version: this.version + 1,
      }),
    );
    this.addDomainEvent(
      new AbandonedCartStatusChangedEvent({
        aggregateId: this.id,
        payload: { abandonedCartId: this.id, fromStatus: from, toStatus: 'unsubscribed' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: AbandonedCartIdVO;
    props: AbandonedCartEntityProps;
    now: string;
  }): AbandonedCartEntity {
    const entity = new AbandonedCartEntity(
      params.id.value,
      params.now,
      params.now,
      params.props,
      AbandonedCartStatusVO.pending(),
    );
    entity.addDomainEvent(
      new AbandonedCartDetectedEvent({
        aggregateId: params.id.value,
        payload: {
          abandonedCartId: params.id.value,
          cartId: params.props.cartId.value,
          itemCount: params.props.itemCount,
          cartValue: params.props.cartValue,
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
    status: string;
    props: AbandonedCartEntityProps;
    version?: number;
  }): AbandonedCartEntity {
    const entity = new AbandonedCartEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      AbandonedCartStatusVO.reconstitute(params.status),
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
