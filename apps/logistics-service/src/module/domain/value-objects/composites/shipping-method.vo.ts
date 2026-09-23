import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ShippingMethodTypeVO } from '../primitives/shipping-method-type.vo';
import { WeightVO } from '../primitives/weight.vo';

export interface ShippingMethodProps {
  readonly name: string;
  readonly type: ShippingMethodTypeVO;
  readonly baseRate: number;
  readonly perKgRate: number | null;
  readonly currency: string;
  readonly estimatedDays: number | null;
  readonly maxWeight: WeightVO | null;
}

export class ShippingMethodVO extends BaseVO<ShippingMethodProps> {
  private constructor(props: ShippingMethodProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ShippingMethodProps): ShippingMethodVO {
    return new ShippingMethodVO(props);
  }

  get name(): string { return this.value.name; }
  get type(): ShippingMethodTypeVO { return this.value.type; }
  get baseRate(): number { return this.value.baseRate; }
  get perKgRate(): number | null { return this.value.perKgRate; }
  get currency(): string { return this.value.currency; }
  get estimatedDays(): number | null { return this.value.estimatedDays; }
  get maxWeight(): WeightVO | null { return this.value.maxWeight; }
}
