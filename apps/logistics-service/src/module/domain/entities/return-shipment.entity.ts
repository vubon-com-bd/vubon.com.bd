import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ReturnShipmentStatusVO } from '../value-objects/primitives/return-shipment-status.vo';
import { ReturnReasonVO } from '../value-objects/primitives/return-reason.vo';
import { ReturnReasonTypeVO } from '../value-objects/primitives/return-reason-type.vo';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';
import {
  ReturnShipmentRequestedEvent,
  ReturnShipmentReceivedEvent,
} from '../events/return-shipment.events';

export interface ReturnShipmentEntityProps {
  readonly shipmentId: ShipmentIdVO;
  readonly reason: ReturnReasonVO;
  readonly reasonType: ReturnReasonTypeVO;
  readonly status: ReturnShipmentStatusVO;
  readonly requestedAt: Date;
  readonly approvedAt: Date | null;
  readonly receivedAt: Date | null;
}

export class ReturnShipmentEntity extends AggregateRoot<string> {
  private readonly _shipmentId: ShipmentIdVO;
  private readonly _reason: ReturnReasonVO;
  private readonly _reasonType: ReturnReasonTypeVO;
  private readonly _status: ReturnShipmentStatusVO;
  private readonly _requestedAt: Date;
  private readonly _approvedAt: Date | null;
  private readonly _receivedAt: Date | null;

  private constructor(
    id: string,
    props: ReturnShipmentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._shipmentId = props.shipmentId;
    this._reason = props.reason;
    this._reasonType = props.reasonType;
    this._status = props.status;
    this._requestedAt = props.requestedAt;
    this._approvedAt = props.approvedAt;
    this._receivedAt = props.receivedAt;
  }

  static create(props: ReturnShipmentEntityProps): ReturnShipmentEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const entity = new ReturnShipmentEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new ReturnShipmentRequestedEvent(
        id,
        id,
        props.shipmentId.value,
        props.reason.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: string,
    props: ReturnShipmentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ReturnShipmentEntity {
    return new ReturnShipmentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  approve(): ReturnShipmentEntity {
    const now = new Date().toISOString();
    return new ReturnShipmentEntity(
      this.id,
      { ...this._toProps(), status: ReturnShipmentStatusVO.create('approved'), approvedAt: new Date() },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
  }

  markReceived(): ReturnShipmentEntity {
    const now = new Date().toISOString();
    const updated = new ReturnShipmentEntity(
      this.id,
      { ...this._toProps(), status: ReturnShipmentStatusVO.create('received'), receivedAt: new Date() },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ReturnShipmentReceivedEvent(
        this.id,
        this.id,
        this._shipmentId.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  get shipmentId(): ShipmentIdVO { return this._shipmentId; }
  get reason(): ReturnReasonVO { return this._reason; }
  get reasonType(): ReturnReasonTypeVO { return this._reasonType; }
  get status(): ReturnShipmentStatusVO { return this._status; }
  get requestedAt(): Date { return this._requestedAt; }
  get approvedAt(): Date | null { return this._approvedAt; }
  get receivedAt(): Date | null { return this._receivedAt; }

  private _toProps(): ReturnShipmentEntityProps {
    return {
      shipmentId: this._shipmentId,
      reason: this._reason,
      reasonType: this._reasonType,
      status: this._status,
      requestedAt: this._requestedAt,
      approvedAt: this._approvedAt,
      receivedAt: this._receivedAt,
    };
  }
}
