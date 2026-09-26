import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo';
import { DeliveryTypeVO } from '../value-objects/primitives/delivery-type.vo';
import { DeliveryMethodIdVO } from '../value-objects/primitives/delivery-method-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import {
  DeliveryScheduledEvent,
  DeliveryRescheduledEvent,
  DeliveryAttemptedEvent,
  DeliveryCompletedEvent,
} from '../events/delivery.events';

export interface DeliveryEntityProps {
  readonly orderId: OrderIdVO;
  readonly status: DeliveryStatusVO;
  readonly type: DeliveryTypeVO;
  readonly methodId: DeliveryMethodIdVO | null;
  readonly scheduledAt: Date | null;
  readonly attemptedAt: Date | null;
  readonly deliveredAt: Date | null;
}

export class DeliveryEntity extends AggregateRoot<DeliveryIdVO> {
  private readonly _orderId: OrderIdVO;
  private readonly _status: DeliveryStatusVO;
  private readonly _type: DeliveryTypeVO;
  private readonly _methodId: DeliveryMethodIdVO | null;
  private readonly _scheduledAt: Date | null;
  private readonly _attemptedAt: Date | null;
  private readonly _deliveredAt: Date | null;

  private constructor(
    id: DeliveryIdVO,
    props: DeliveryEntityProps,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._orderId = props.orderId;
    this._status = props.status;
    this._type = props.type;
    this._methodId = props.methodId;
    this._scheduledAt = props.scheduledAt;
    this._attemptedAt = props.attemptedAt;
    this._deliveredAt = props.deliveredAt;
  }

  static create(props: DeliveryEntityProps): DeliveryEntity {
    const now = new Date().toISOString();
    const id = DeliveryIdVO.create(crypto.randomUUID());
    const entity = new DeliveryEntity(id, props, now, now);
    entity.addDomainEvent(
      new DeliveryScheduledEvent(
        id.value,
        id.value,
        props.orderId.value,
        (props.scheduledAt ?? new Date()).toISOString(),
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: DeliveryIdVO,
    props: DeliveryEntityProps,
    createdAt: string,
    updatedAt: string,
  ): DeliveryEntity {
    return new DeliveryEntity(id, props, createdAt, updatedAt);
  }

  reschedule(scheduledAt: Date): DeliveryEntity {
    const updated = new DeliveryEntity(
      this.id,
      { ...this._toProps(), scheduledAt },
      this.createdAt,
      new Date().toISOString(),
    );
    updated.addDomainEvent(
      new DeliveryRescheduledEvent(
        this.id.value,
        this.id.value,
        this._orderId.value,
        scheduledAt.toISOString(),
        this.version + 1,
      ),
    );
    return updated;
  }

  markAttempted(): DeliveryEntity {
    const updated = new DeliveryEntity(
      this.id,
      { ...this._toProps(), status: DeliveryStatusVO.create('attempted'), attemptedAt: new Date() },
      this.createdAt,
      new Date().toISOString(),
    );
    updated.addDomainEvent(
      new DeliveryAttemptedEvent(this.id.value, this.id.value, this._orderId.value, this.version + 1),
    );
    return updated;
  }

  markCompleted(): DeliveryEntity {
    const now = new Date();
    const updated = new DeliveryEntity(
      this.id,
      { ...this._toProps(), status: DeliveryStatusVO.create('delivered'), deliveredAt: now },
      this.createdAt,
      now.toISOString(),
    );
    updated.addDomainEvent(
      new DeliveryCompletedEvent(
        this.id.value,
        this.id.value,
        this._orderId.value,
        now.toISOString(),
        this.version + 1,
      ),
    );
    return updated;
  }

  get orderId(): OrderIdVO { return this._orderId; }
  get status(): DeliveryStatusVO { return this._status; }
  get type(): DeliveryTypeVO { return this._type; }
  get methodId(): DeliveryMethodIdVO | null { return this._methodId; }
  get scheduledAt(): Date | null { return this._scheduledAt; }
  get attemptedAt(): Date | null { return this._attemptedAt; }
  get deliveredAt(): Date | null { return this._deliveredAt; }

  private _toProps(): DeliveryEntityProps {
    return {
      orderId: this._orderId,
      status: this._status,
      type: this._type,
      methodId: this._methodId,
      scheduledAt: this._scheduledAt,
      attemptedAt: this._attemptedAt,
      deliveredAt: this._deliveredAt,
    };
  }
}
