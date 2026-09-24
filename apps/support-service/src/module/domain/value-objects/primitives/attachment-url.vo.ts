import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class AttachmentUrlVO extends BaseCodeVO {
  static create(value: string): AttachmentUrlVO {
    BaseCodeVO.validateNonEmpty(value, 'AttachmentUrl');
    try {
      new URL(value);
    } catch {
      throw new Error(`Invalid attachment URL: ${value}`);
    }
    return new AttachmentUrlVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
