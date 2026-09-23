import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { LocationIdVO } from '../value-objects/primitives/location-id.vo';
import { LocationCodeVO } from '../value-objects/primitives/location-code.vo';
import { LocationNameVO } from '../value-objects/primitives/location-name.vo';
import { LocationStatusVO } from '../value-objects/primitives/location-status.vo';
import { LocationTypeVO } from '../value-objects/primitives/location-type.vo';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo';

export interface InventoryLocationEntityProps {
  readonly warehouseId: WarehouseIdVO;
  readonly code: LocationCodeVO;
  readonly name: LocationNameVO | null;
  readonly type: LocationTypeVO;
  readonly status: LocationStatusVO;
  readonly capacity: number | null;
}

export class InventoryLocationEntity extends BaseEntity<LocationIdVO> {
  private readonly _warehouseId: WarehouseIdVO;
  private readonly _code: LocationCodeVO;
  private readonly _name: LocationNameVO | null;
  private readonly _type: LocationTypeVO;
  private readonly _status: LocationStatusVO;
  private readonly _capacity: number | null;

  private constructor(
    id: LocationIdVO,
    props: InventoryLocationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._warehouseId = props.warehouseId;
    this._code = props.code;
    this._name = props.name;
    this._type = props.type;
    this._status = props.status;
    this._capacity = props.capacity;
  }

  static create(props: InventoryLocationEntityProps): InventoryLocationEntity {
    const now = new Date().toISOString();
    const id = LocationIdVO.create(crypto.randomUUID());
    return new InventoryLocationEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: LocationIdVO,
    props: InventoryLocationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): InventoryLocationEntity {
    return new InventoryLocationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get warehouseId(): WarehouseIdVO { return this._warehouseId; }
  get code(): LocationCodeVO { return this._code; }
  get name(): LocationNameVO | null { return this._name; }
  get type(): LocationTypeVO { return this._type; }
  get status(): LocationStatusVO { return this._status; }
  get capacity(): number | null { return this._capacity; }
}
