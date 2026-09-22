import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidDocumentIdError } from '../../errors/document.errors';

export class DocumentUrlVO extends BaseCodeVO {
  static create(value: string): DocumentUrlVO {
    const trimmed = value.trim();
    if (!/^https?:\/\//.test(trimmed)) {
      throw new InvalidDocumentIdError(value);
    }
    return new DocumentUrlVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
