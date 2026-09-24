import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';

export class DeliveryAttemptVO extends BaseQuantityVO {
  private static readonly MAX = 10;

  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): DeliveryAttemptVO {
    BaseQuantityVO.validateNonNegative(raw, 'DeliveryAttempt');
    if (!Number.isInteger(raw)) {
      throw new Error('DeliveryAttempt must be an integer');
    }
    if (raw > DeliveryAttemptVO.MAX) {
      throw new Error(`DeliveryAttempt must be <= ${DeliveryAttemptVO.MAX}`);
    }
    return new DeliveryAttemptVO(raw);
  }

  increment(): DeliveryAttemptVO {
    return DeliveryAttemptVO.create(this.value + 1);
  }

  hasExceededLimit(): boolean {
    return this.value >= DeliveryAttemptVO.MAX;
  }
}
