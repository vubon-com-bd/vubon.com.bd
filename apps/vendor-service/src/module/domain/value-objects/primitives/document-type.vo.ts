import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_DOCUMENT_TYPE } from '@vubon/shared-constants/business/vendor';
import { InvalidDocumentTypeError } from '../../errors/document.errors';

const VALID = new Set<string>(Object.values(VENDOR_DOCUMENT_TYPE));

export class DocumentTypeVO extends BaseTypeVO {
  static create(value: string): DocumentTypeVO {
    if (!VALID.has(value)) {
      throw new InvalidDocumentTypeError(value);
    }
    return new DocumentTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
