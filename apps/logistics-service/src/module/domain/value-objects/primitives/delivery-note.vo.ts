import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class DeliveryNoteVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryNoteVO {
    BaseCodeVO.validateNonEmpty(raw, 'DeliveryNote');
    return new DeliveryNoteVO(raw);
  }
}
