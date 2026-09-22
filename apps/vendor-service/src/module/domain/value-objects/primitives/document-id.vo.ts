import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidDocumentIdError } from '../../errors/document.errors';

export class DocumentIdVO extends BaseIdVO {
  static create(value: string): DocumentIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidDocumentIdError(value);
    }
    return new DocumentIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
