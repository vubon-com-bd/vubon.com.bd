import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';

export class RouteDistanceVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): RouteDistanceVO {
    BaseQuantityVO.validateNonNegative(raw, 'RouteDistance');
    return new RouteDistanceVO(raw);
  }

  toKm(): number {
    return this.value;
  }
}
