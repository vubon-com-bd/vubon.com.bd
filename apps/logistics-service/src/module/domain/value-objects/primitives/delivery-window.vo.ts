import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class DeliveryWindowVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryWindowVO {
    BaseCodeVO.validateNonEmpty(raw, 'DeliveryWindow');
    return new DeliveryWindowVO(raw);
  }
}
