import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CourierIdVO } from '../value-objects/primitives/courier-id.vo';
import { CourierNameVO } from '../value-objects/primitives/courier-name.vo';
import { CourierStatusVO } from '../value-objects/primitives/courier-status.vo';
import { CourierTypeVO } from '../value-objects/primitives/courier-type.vo';
import { COURIER_STATUS } from '@vubon/shared-constants/logistics';
import {
  CourierRegisteredEvent,
  CourierSuspendedEvent,
} from '../events/courier.events';

export interface CourierEntityProps {
  readonly name: CourierNameVO;
  readonly type: CourierTypeVO;
  readonly status: CourierStatusVO;
  readonly apiUrl: string | null;
}

export class CourierEntity extends AggregateRoot<CourierIdVO> {
  private readonly _name: CourierNameVO;
  private readonly _type: CourierTypeVO;
  private readonly _status: CourierStatusVO;
  private readonly _apiUrl: string | null;

  private constructor(
    id: CourierIdVO,
    props: CourierEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._status = props.status;
    this._apiUrl = props.apiUrl;
  }

  static create(props: CourierEntityProps): CourierEntity {
    const now = new Date().toISOString();
    const id = CourierIdVO.create(crypto.randomUUID());
    const entity = new CourierEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new CourierRegisteredEvent(id.value, id.value, props.name.value, props.type.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: CourierIdVO,
    props: CourierEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CourierEntity {
    return new CourierEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  suspend(reason: string): CourierEntity {
    const now = new Date().toISOString();
    const updated = new CourierEntity(
      this.id,
      { ...this._toProps(), status: CourierStatusVO.create(COURIER_STATUS.SUSPENDED) },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new CourierSuspendedEvent(this.id.value, this.id.value, reason, this.version + 1),
    );
    return updated;
  }

  get name(): CourierNameVO { return this._name; }
  get type(): CourierTypeVO { return this._type; }
  get status(): CourierStatusVO { return this._status; }
  get apiUrl(): string | null { return this._apiUrl; }
  get isActive(): boolean { return this._status.value === COURIER_STATUS.ACTIVE; }

  private _toProps(): CourierEntityProps {
    return {
      name: this._name,
      type: this._type,
      status: this._status,
      apiUrl: this._apiUrl,
    };
  }
}
