import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { DispatchIdVO } from '../value-objects/primitives/dispatch-id.vo';
import { DispatchStatusVO } from '../value-objects/primitives/dispatch-status.vo';
import { DispatchTypeVO } from '../value-objects/primitives/dispatch-type.vo';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';
import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo';
import { RouteIdVO } from '../value-objects/primitives/route-id.vo';
import {
  DispatchCreatedEvent,
  DispatchDepartedEvent,
  DispatchArrivedEvent,
} from '../events/dispatch.events';
import { DispatchAlreadyStartedError } from '../errors/dispatch.errors';

export interface DispatchEntityProps {
  readonly shipmentId: ShipmentIdVO;
  readonly vehicleId: VehicleIdVO | null;
  readonly driverId: DriverIdVO | null;
  readonly routeId: RouteIdVO | null;
  readonly status: DispatchStatusVO;
  readonly type: DispatchTypeVO;
  readonly departedAt: Date | null;
  readonly arrivedAt: Date | null;
}

export class DispatchEntity extends AggregateRoot<DispatchIdVO> {
  private readonly _shipmentId: ShipmentIdVO;
  private readonly _vehicleId: VehicleIdVO | null;
  private readonly _driverId: DriverIdVO | null;
  private readonly _routeId: RouteIdVO | null;
  private readonly _status: DispatchStatusVO;
  private readonly _type: DispatchTypeVO;
  private readonly _departedAt: Date | null;
  private readonly _arrivedAt: Date | null;

  private constructor(
    id: DispatchIdVO,
    props: DispatchEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._shipmentId = props.shipmentId;
    this._vehicleId = props.vehicleId;
    this._driverId = props.driverId;
    this._routeId = props.routeId;
    this._status = props.status;
    this._type = props.type;
    this._departedAt = props.departedAt;
    this._arrivedAt = props.arrivedAt;
  }

  static create(props: DispatchEntityProps): DispatchEntity {
    const now = new Date().toISOString();
    const id = DispatchIdVO.create(crypto.randomUUID());
    const entity = new DispatchEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new DispatchCreatedEvent(id.value, id.value, props.shipmentId.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: DispatchIdVO,
    props: DispatchEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): DispatchEntity {
    return new DispatchEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  depart(): DispatchEntity {
    if (this._departedAt) {
      throw new DispatchAlreadyStartedError(this.id.value);
    }
    const now = new Date().toISOString();
    const updated = new DispatchEntity(
      this.id,
      {
        ...this._toProps(),
        status: DispatchStatusVO.create('departed'),
        departedAt: new Date(),
      },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new DispatchDepartedEvent(this.id.value, this.id.value, now, this.version + 1),
    );
    return updated;
  }

  arrive(): DispatchEntity {
    const now = new Date().toISOString();
    const updated = new DispatchEntity(
      this.id,
      {
        ...this._toProps(),
        status: DispatchStatusVO.create('arrived'),
        arrivedAt: new Date(),
      },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new DispatchArrivedEvent(this.id.value, this.id.value, now, this.version + 1),
    );
    return updated;
  }

  get shipmentId(): ShipmentIdVO { return this._shipmentId; }
  get vehicleId(): VehicleIdVO | null { return this._vehicleId; }
  get driverId(): DriverIdVO | null { return this._driverId; }
  get routeId(): RouteIdVO | null { return this._routeId; }
  get status(): DispatchStatusVO { return this._status; }
  get type(): DispatchTypeVO { return this._type; }
  get departedAt(): Date | null { return this._departedAt; }
  get arrivedAt(): Date | null { return this._arrivedAt; }

  private _toProps(): DispatchEntityProps {
    return {
      shipmentId: this._shipmentId,
      vehicleId: this._vehicleId,
      driverId: this._driverId,
      routeId: this._routeId,
      status: this._status,
      type: this._type,
      departedAt: this._departedAt,
      arrivedAt: this._arrivedAt,
    };
  }
}
