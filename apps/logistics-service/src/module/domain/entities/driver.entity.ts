import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo';
import { DriverNameVO } from '../value-objects/primitives/driver-name.vo';
import { DriverStatusVO } from '../value-objects/primitives/driver-status.vo';
import { DriverTypeVO } from '../value-objects/primitives/driver-type.vo';
import { DriverLicenseVO } from '../value-objects/primitives/driver-license.vo';
import {
  DriverRegisteredEvent,
  DriverAssignedEvent,
} from '../events/driver.events';

export interface DriverEntityProps {
  readonly name: DriverNameVO;
  readonly phone: string;
  readonly license: DriverLicenseVO;
  readonly type: DriverTypeVO;
  readonly status: DriverStatusVO;
}

export class DriverEntity extends AggregateRoot<DriverIdVO> {
  private readonly _name: DriverNameVO;
  private readonly _phone: string;
  private readonly _license: DriverLicenseVO;
  private readonly _type: DriverTypeVO;
  private readonly _status: DriverStatusVO;

  private constructor(
    id: DriverIdVO,
    props: DriverEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._phone = props.phone;
    this._license = props.license;
    this._type = props.type;
    this._status = props.status;
  }

  static create(props: DriverEntityProps): DriverEntity {
    const now = new Date().toISOString();
    const id = DriverIdVO.create(crypto.randomUUID());
    const entity = new DriverEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new DriverRegisteredEvent(
        id.value,
        id.value,
        props.name.value,
        props.license.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: DriverIdVO,
    props: DriverEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): DriverEntity {
    return new DriverEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  assignTo(dispatchId: string): DriverEntity {
    const now = new Date().toISOString();
    const updated = new DriverEntity(
      this.id,
      { ...this._toProps(), status: DriverStatusVO.create('on_duty') },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new DriverAssignedEvent(this.id.value, this.id.value, dispatchId, this.version + 1),
    );
    return updated;
  }

  get name(): DriverNameVO { return this._name; }
  get phone(): string { return this._phone; }
  get license(): DriverLicenseVO { return this._license; }
  get type(): DriverTypeVO { return this._type; }
  get status(): DriverStatusVO { return this._status; }
  get isAvailable(): boolean { return this._status.value === 'available'; }

  private _toProps(): DriverEntityProps {
    return {
      name: this._name,
      phone: this._phone,
      license: this._license,
      type: this._type,
      status: this._status,
    };
  }
}
