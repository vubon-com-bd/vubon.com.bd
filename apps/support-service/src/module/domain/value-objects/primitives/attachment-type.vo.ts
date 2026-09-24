import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>(['image', 'video', 'audio', 'document', 'archive', 'other']);

export class AttachmentTypeVO extends BaseTypeVO<string> {
  static create(value: string): AttachmentTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid attachment type: ${value}`);
    }
    return new AttachmentTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
