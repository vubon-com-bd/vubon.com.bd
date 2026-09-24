import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';

export class AttachmentSizeVO extends BaseQuantityVO {
  static create(bytes: number): AttachmentSizeVO {
    if (bytes < 0) {
      throw new Error('Attachment size must be non-negative');
    }
    if (bytes > 100 * 1024 * 1024) {
      throw new Error('Attachment size exceeds 100MB');
    }
    return new AttachmentSizeVO(bytes);
  }

  private constructor(value: number) {
    super(value);
  }
}
