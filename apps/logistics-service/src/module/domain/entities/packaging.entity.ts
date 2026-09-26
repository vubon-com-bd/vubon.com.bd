import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { PackagingTypeVO } from '../value-objects/primitives/packaging-type.vo';
import { PackagingMaterialVO } from '../value-objects/primitives/packaging-material.vo';
import { PackagingSizeVO } from '../value-objects/primitives/packaging-size.vo';
import { WeightVO } from '../value-objects/primitives/weight.vo';

export interface PackagingEntityProps {
  readonly type: PackagingTypeVO;
  readonly material: PackagingMaterialVO;
  readonly size: PackagingSizeVO;
  readonly maxWeight: WeightVO | null;
  readonly cost: number;
  readonly currency: string;
  readonly status: string;
}

export class PackagingEntity extends BaseEntity<string> {
  private readonly _type: PackagingTypeVO;
  private readonly _material: PackagingMaterialVO;
  private readonly _size: PackagingSizeVO;
  private readonly _maxWeight: WeightVO | null;
  private readonly _cost: number;
  private readonly _currency: string;
  private readonly _status: string;

  private constructor(
    id: string,
    props: PackagingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._material = props.material;
    this._size = props.size;
    this._maxWeight = props.maxWeight;
    this._cost = props.cost;
    this._currency = props.currency;
    this._status = props.status;
  }

  static create(props: PackagingEntityProps): PackagingEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new PackagingEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: PackagingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PackagingEntity {
    return new PackagingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get type(): PackagingTypeVO { return this._type; }
  get material(): PackagingMaterialVO { return this._material; }
  get size(): PackagingSizeVO { return this._size; }
  get maxWeight(): WeightVO | null { return this._maxWeight; }
  get cost(): number { return this._cost; }
  get currency(): string { return this._currency; }
  get status(): string { return this._status; }
}
