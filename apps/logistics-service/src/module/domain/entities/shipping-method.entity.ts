import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ShippingMethodTypeVO } from '../value-objects/primitives/shipping-method-type.vo';
import { ZoneIdVO } from '../value-objects/primitives/zone-id.vo';

export interface ShippingMethodEntityProps {
  readonly name: string;
  readonly type: ShippingMethodTypeVO;
  readonly status: string;
  readonly baseRate: number;
  readonly perKgRate: number | null;
  readonly currency: string;
  readonly estimatedDays: number | null;
  readonly zones: readonly ZoneIdVO[];
}

export class ShippingMethodEntity extends BaseEntity<string> {
  private readonly _name: string;
  private readonly _type: ShippingMethodTypeVO;
  private readonly _status: string;
  private readonly _baseRate: number;
  private readonly _perKgRate: number | null;
  private readonly _currency: string;
  private readonly _estimatedDays: number | null;
  private readonly _zones: readonly ZoneIdVO[];

  private constructor(
    id: string,
    props: ShippingMethodEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._status = props.status;
    this._baseRate = props.baseRate;
    this._perKgRate = props.perKgRate;
    this._currency = props.currency;
    this._estimatedDays = props.estimatedDays;
    this._zones = Object.freeze([...props.zones]);
  }

  static create(props: ShippingMethodEntityProps): ShippingMethodEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new ShippingMethodEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: ShippingMethodEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ShippingMethodEntity {
    return new ShippingMethodEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get type(): ShippingMethodTypeVO { return this._type; }
  get status(): string { return this._status; }
  get baseRate(): number { return this._baseRate; }
  get perKgRate(): number | null { return this._perKgRate; }
  get currency(): string { return this._currency; }
  get estimatedDays(): number | null { return this._estimatedDays; }
  get zones(): readonly ZoneIdVO[] { return this._zones; }
}
