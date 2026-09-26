import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo';
import { DeliveryTypeVO } from '../value-objects/primitives/delivery-type.vo';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';
import { DeliveryNoteVO } from '../value-objects/primitives/delivery-note.vo';
import { DELIVERY_STATUS } from '@vubon/shared-constants/logistics';
import {
  DeliveryScheduledEvent,
  DeliveryAttemptedEvent,
  DeliveryCompletedEvent,
  DeliveryFailedEvent,
} from '../events/delivery.events';
import { DeliveryAttemptExceededError } from '../errors/delivery.errors';

export interface DeliveryEntityProps {
  readonly shipmentId: ShipmentIdVO;
  readonly status: DeliveryStatusVO;
  readonly type: DeliveryTypeVO;
  readonly scheduledAt: Date | null;
  readonly deliveredAt: Date | null;
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly note: DeliveryNoteVO | null;
}

export class DeliveryEntity extends AggregateRoot<DeliveryIdVO> {
  private readonly _shipmentId: ShipmentIdVO;
  private readonly _status: DeliveryStatusVO;
  private readonly _type: DeliveryTypeVO;
  private readonly _scheduledAt: Date | null;
  private readonly _deliveredAt: Date | null;
  private readonly _attempts: number;
  private readonly _maxAttempts: number;
  private readonly _note: DeliveryNoteVO | null;

  private constructor(
    id: DeliveryIdVO,
    props: DeliveryEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._shipmentId = props.shipmentId;
    this._status = props.status;
    this._type = props.type;
    this._scheduledAt = props.scheduledAt;
    this._deliveredAt = props.deliveredAt;
    this._attempts = props.attempts;
    this._maxAttempts = props.maxAttempts;
    this._note = props.note;
  }

  static create(props: DeliveryEntityProps): DeliveryEntity {
    const now = new Date().toISOString();
    const id = DeliveryIdVO.create(crypto.randomUUID());
    const entity = new DeliveryEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new DeliveryScheduledEvent(
        id.value,
        id.value,
        props.shipmentId.value,
        now,
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
    deletedAt: string | null,
  ): DeliveryEntity {
    return new DeliveryEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  recordAttempt(status: string): DeliveryEntity {
    if (this._attempts >= this._maxAttempts) {
      throw new DeliveryAttemptExceededError(this.id.value, this._attempts);
    }
    const now = new Date().toISOString();
    const updated = new DeliveryEntity(
      this.id,
      { ...this._toProps(), attempts: this._attempts + 1 },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new DeliveryAttemptedEvent(
        this.id.value,
        this.id.value,
        this._attempts + 1,
        status,
        this.version + 1,
      ),
    );
    return updated;
  }

  complete(): DeliveryEntity {
    const now = new Date().toISOString();
    const updated = new DeliveryEntity(
      this.id,
      {
        ...this._toProps(),
        status: DeliveryStatusVO.create(DELIVERY_STATUS.DELIVERED),
        deliveredAt: new Date(),
      },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new DeliveryCompletedEvent(
        this.id.value,
        this.id.value,
        this._shipmentId.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  fail(reason: string): DeliveryEntity {
    const now = new Date().toISOString();
    const updated = new DeliveryEntity(
      this.id,
      { ...this._toProps(), status: DeliveryStatusVO.create(DELIVERY_STATUS.FAILED) },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new DeliveryFailedEvent(
        this.id.value,
        this.id.value,
        this._shipmentId.value,
        reason,
        this.version + 1,
      ),
    );
    return updated;
  }

  get shipmentId(): ShipmentIdVO { return this._shipmentId; }
  get status(): DeliveryStatusVO { return this._status; }
  get type(): DeliveryTypeVO { return this._type; }
  get scheduledAt(): Date | null { return this._scheduledAt; }
  get deliveredAt(): Date | null { return this._deliveredAt; }
  get attempts(): number { return this._attempts; }
  get maxAttempts(): number { return this._maxAttempts; }
  get note(): DeliveryNoteVO | null { return this._note; }

  private _toProps(): DeliveryEntityProps {
    return {
      shipmentId: this._shipmentId,
      status: this._status,
      type: this._type,
      scheduledAt: this._scheduledAt,
      deliveredAt: this._deliveredAt,
      attempts: this._attempts,
      maxAttempts: this._maxAttempts,
      note: this._note,
    };
  }
}
