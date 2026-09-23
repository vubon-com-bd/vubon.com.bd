import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo';
import { WarehouseCodeVO } from '../value-objects/primitives/warehouse-code.vo';
import { WarehouseNameVO } from '../value-objects/primitives/warehouse-name.vo';
import { WarehouseStatusVO } from '../value-objects/primitives/warehouse-status.vo';
import { LocationIdVO } from '../value-objects/primitives/location-id.vo';
import { LocationCodeVO } from '../value-objects/primitives/location-code.vo';
import {
  WarehouseCreatedEvent,
  LocationAddedEvent,
} from '../events/warehouse.events';

export interface WarehouseEntityProps {
  readonly code: WarehouseCodeVO;
  readonly name: WarehouseNameVO;
  readonly status: WarehouseStatusVO;
  readonly division: string | null;
  readonly district: string | null;
  readonly address: string | null;
  readonly capacity: number | null;
  readonly locations: readonly LocationIdVO[];
}

export class WarehouseEntity extends AggregateRoot<WarehouseIdVO> {
  private readonly _code: WarehouseCodeVO;
  private readonly _name: WarehouseNameVO;
  private readonly _status: WarehouseStatusVO;
  private readonly _division: string | null;
  private readonly _district: string | null;
  private readonly _address: string | null;
  private readonly _capacity: number | null;
  private readonly _locations: readonly LocationIdVO[];

  private constructor(
    id: WarehouseIdVO,
    props: WarehouseEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._code = props.code;
    this._name = props.name;
    this._status = props.status;
    this._division = props.division;
    this._district = props.district;
    this._address = props.address;
    this._capacity = props.capacity;
    this._locations = Object.freeze([...props.locations]);
  }

  static create(props: WarehouseEntityProps): WarehouseEntity {
    const now = new Date().toISOString();
    const id = WarehouseIdVO.create(crypto.randomUUID());
    const entity = new WarehouseEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new WarehouseCreatedEvent(
        id.value,
        id.value,
        props.code.value,
        props.name.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: WarehouseIdVO,
    props: WarehouseEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): WarehouseEntity {
    return new WarehouseEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  addLocation(locationId: LocationIdVO, code: LocationCodeVO): WarehouseEntity {
    const now = new Date().toISOString();
    const updated = new WarehouseEntity(
      this.id,
      { ...this._toProps(), locations: [...this._locations, locationId] },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new LocationAddedEvent(
        this.id.value,
        this.id.value,
        locationId.value,
        code.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  get code(): WarehouseCodeVO { return this._code; }
  get name(): WarehouseNameVO { return this._name; }
  get status(): WarehouseStatusVO { return this._status; }
  get division(): string | null { return this._division; }
  get district(): string | null { return this._district; }
  get address(): string | null { return this._address; }
  get capacity(): number | null { return this._capacity; }
  get locations(): readonly LocationIdVO[] { return this._locations; }

  private _toProps(): WarehouseEntityProps {
    return {
      code: this._code,
      name: this._name,
      status: this._status,
      division: this._division,
      district: this._district,
      address: this._address,
      capacity: this._capacity,
      locations: this._locations,
    };
  }
}
