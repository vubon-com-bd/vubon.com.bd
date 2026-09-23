import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo';
import { VehicleNumberVO } from '../value-objects/primitives/vehicle-number.vo';
import { VehicleTypeVO } from '../value-objects/primitives/vehicle-type.vo';
import { VehicleStatusVO } from '../value-objects/primitives/vehicle-status.vo';
import { VehicleCapacityVO } from '../value-objects/primitives/vehicle-capacity.vo';
import { VehicleFuelTypeVO } from '../value-objects/primitives/vehicle-fuel-type.vo';
import {
  VehicleRegisteredEvent,
  VehicleMaintenanceEvent,
} from '../events/vehicle.events';

export interface VehicleEntityProps {
  readonly number: VehicleNumberVO;
  readonly type: VehicleTypeVO;
  readonly status: VehicleStatusVO;
  readonly capacity: VehicleCapacityVO | null;
  readonly fuelType: VehicleFuelTypeVO | null;
}

export class VehicleEntity extends AggregateRoot<VehicleIdVO> {
  private readonly _number: VehicleNumberVO;
  private readonly _type: VehicleTypeVO;
  private readonly _status: VehicleStatusVO;
  private readonly _capacity: VehicleCapacityVO | null;
  private readonly _fuelType: VehicleFuelTypeVO | null;

  private constructor(
    id: VehicleIdVO,
    props: VehicleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._number = props.number;
    this._type = props.type;
    this._status = props.status;
    this._capacity = props.capacity;
    this._fuelType = props.fuelType;
  }

  static create(props: VehicleEntityProps): VehicleEntity {
    const now = new Date().toISOString();
    const id = VehicleIdVO.create(crypto.randomUUID());
    const entity = new VehicleEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new VehicleRegisteredEvent(
        id.value,
        id.value,
        props.number.value,
        props.type.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: VehicleIdVO,
    props: VehicleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VehicleEntity {
    return new VehicleEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  sendToMaintenance(reason: string): VehicleEntity {
    const now = new Date().toISOString();
    const updated = new VehicleEntity(
      this.id,
      { ...this._toProps(), status: VehicleStatusVO.create('maintenance') },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new VehicleMaintenanceEvent(this.id.value, this.id.value, reason, this.version + 1),
    );
    return updated;
  }

  get number(): VehicleNumberVO { return this._number; }
  get type(): VehicleTypeVO { return this._type; }
  get status(): VehicleStatusVO { return this._status; }
  get capacity(): VehicleCapacityVO | null { return this._capacity; }
  get fuelType(): VehicleFuelTypeVO | null { return this._fuelType; }

  private _toProps(): VehicleEntityProps {
    return {
      number: this._number,
      type: this._type,
      status: this._status,
      capacity: this._capacity,
      fuelType: this._fuelType,
    };
  }
}
