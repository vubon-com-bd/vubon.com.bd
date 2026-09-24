import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class AttachmentIdVO extends BaseIdVO {
  static create(value: string): AttachmentIdVO {
    return new AttachmentIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
