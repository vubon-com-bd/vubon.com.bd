import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CourierIdVO } from '../primitives/courier-id.vo';
import { ZoneIdVO } from '../primitives/zone-id.vo';
import { WeightVO } from '../primitives/weight.vo';

export interface CourierRateProps {
  readonly courierId: CourierIdVO;
  readonly zoneId: ZoneIdVO | null;
  readonly weightMin: WeightVO;
  readonly weightMax: WeightVO;
  readonly baseRate: number;
  readonly perKgRate: number;
  readonly currency: string;
}

export class CourierRateVO extends BaseVO<CourierRateProps> {
  private constructor(props: CourierRateProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CourierRateProps): CourierRateVO {
    if (props.weightMax.toKg() < props.weightMin.toKg()) {
      throw new Error('weightMax must be >= weightMin');
    }
    return new CourierRateVO(props);
  }

  get courierId(): CourierIdVO { return this.value.courierId; }
  get zoneId(): ZoneIdVO | null { return this.value.zoneId; }
  get weightMin(): WeightVO { return this.value.weightMin; }
  get weightMax(): WeightVO { return this.value.weightMax; }
  get baseRate(): number { return this.value.baseRate; }
  get perKgRate(): number { return this.value.perKgRate; }
  get currency(): string { return this.value.currency; }
}
