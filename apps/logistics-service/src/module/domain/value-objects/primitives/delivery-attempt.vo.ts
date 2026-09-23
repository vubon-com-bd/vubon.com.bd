import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class DeliveryAttemptVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryAttemptVO {
    BaseCodeVO.validateNonEmpty(raw, 'DeliveryAttempt');
    return new DeliveryAttemptVO(raw);
  }
}
