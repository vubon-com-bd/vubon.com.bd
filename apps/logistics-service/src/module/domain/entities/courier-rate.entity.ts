import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { CourierIdVO } from '../value-objects/primitives/courier-id.vo';
import { ZoneIdVO } from '../value-objects/primitives/zone-id.vo';
import { WeightVO } from '../value-objects/primitives/weight.vo';

export interface CourierRateEntityProps {
  readonly courierId: CourierIdVO;
  readonly zoneId: ZoneIdVO | null;
  readonly weightMin: WeightVO;
  readonly weightMax: WeightVO;
  readonly baseRate: number;
  readonly perKgRate: number;
  readonly currency: string;
}

export class CourierRateEntity extends BaseEntity<string> {
  private readonly _courierId: CourierIdVO;
  private readonly _zoneId: ZoneIdVO | null;
  private readonly _weightMin: WeightVO;
  private readonly _weightMax: WeightVO;
  private readonly _baseRate: number;
  private readonly _perKgRate: number;
  private readonly _currency: string;

  private constructor(
    id: string,
    props: CourierRateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._courierId = props.courierId;
    this._zoneId = props.zoneId;
    this._weightMin = props.weightMin;
    this._weightMax = props.weightMax;
    this._baseRate = props.baseRate;
    this._perKgRate = props.perKgRate;
    this._currency = props.currency;
  }

  static create(props: CourierRateEntityProps): CourierRateEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new CourierRateEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: CourierRateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CourierRateEntity {
    return new CourierRateEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get courierId(): CourierIdVO { return this._courierId; }
  get zoneId(): ZoneIdVO | null { return this._zoneId; }
  get weightMin(): WeightVO { return this._weightMin; }
  get weightMax(): WeightVO { return this._weightMax; }
  get baseRate(): number { return this._baseRate; }
  get perKgRate(): number { return this._perKgRate; }
  get currency(): string { return this._currency; }
}
