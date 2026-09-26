import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SubscriptionIdVO } from '../value-objects/primitives/subscription-id.vo';
import { SubscriptionPlanVO } from '../value-objects/primitives/subscription-plan.vo';
import { SubscriptionStatusVO } from '../value-objects/primitives/subscription-status.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  SubscriptionCreatedEvent,
  SubscriptionCancelledEvent,
} from '../events/subscription.events';

export interface SubscriptionEntityProps {
  readonly userId: UserIdVO;
  readonly plan: SubscriptionPlanVO;
  readonly status: SubscriptionStatusVO;
  readonly paymentMethodId: string | null;
  readonly currentPeriodFrom: Date;
  readonly currentPeriodTo: Date;
  readonly cancelledAt: Date | null;
}

export class SubscriptionEntity extends AggregateRoot<SubscriptionIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _plan: SubscriptionPlanVO;
  private readonly _status: SubscriptionStatusVO;
  private readonly _paymentMethodId: string | null;
  private readonly _currentPeriodFrom: Date;
  private readonly _currentPeriodTo: Date;
  private readonly _cancelledAt: Date | null;

  private constructor(
    id: SubscriptionIdVO,
    props: SubscriptionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._plan = props.plan;
    this._status = props.status;
    this._paymentMethodId = props.paymentMethodId;
    this._currentPeriodFrom = props.currentPeriodFrom;
    this._currentPeriodTo = props.currentPeriodTo;
    this._cancelledAt = props.cancelledAt;
  }

  static create(props: SubscriptionEntityProps): SubscriptionEntity {
    const now = new Date().toISOString();
    const id = SubscriptionIdVO.create(crypto.randomUUID());
    const entity = new SubscriptionEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new SubscriptionCreatedEvent(id.value, props.userId.value, props.plan.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: SubscriptionIdVO,
    props: SubscriptionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SubscriptionEntity {
    return new SubscriptionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  cancel(): SubscriptionEntity {
    const now = new Date();
    const updated = new SubscriptionEntity(
      this.id,
      { ...this._toProps(), status: SubscriptionStatusVO.create('cancelled'), cancelledAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new SubscriptionCancelledEvent(this.id.value, this._userId.value, this.version + 1),
    );
    return updated;
  }

  get userId(): UserIdVO { return this._userId; }
  get plan(): SubscriptionPlanVO { return this._plan; }
  get status(): SubscriptionStatusVO { return this._status; }
  get paymentMethodId(): string | null { return this._paymentMethodId; }
  get currentPeriodFrom(): Date { return this._currentPeriodFrom; }
  get currentPeriodTo(): Date { return this._currentPeriodTo; }
  get cancelledAt(): Date | null { return this._cancelledAt; }

  private _toProps(): SubscriptionEntityProps {
    return {
      userId: this._userId,
      plan: this._plan,
      status: this._status,
      paymentMethodId: this._paymentMethodId,
      currentPeriodFrom: this._currentPeriodFrom,
      currentPeriodTo: this._currentPeriodTo,
      cancelledAt: this._cancelledAt,
    };
  }
}
