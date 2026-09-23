import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';

export class VehicleCapacityVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): VehicleCapacityVO {
    BaseQuantityVO.validatePositive(raw, 'VehicleCapacity');
    return new VehicleCapacityVO(raw);
  }
}
