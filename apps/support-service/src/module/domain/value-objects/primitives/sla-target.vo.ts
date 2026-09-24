import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';

export class SlaTargetVO extends BaseQuantityVO {
  static create(minutes: number): SlaTargetVO {
    if (minutes <= 0) {
      throw new Error('SLA target must be positive');
    }
    return new SlaTargetVO(minutes);
  }
  private constructor(value: number) {
    super(value);
  }
}
