import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_DOCUMENT_STATUS } from '@vubon/shared-constants/business/vendor';
import { InvalidDocumentStatusError } from '../../errors/document.errors';

const VALID = new Set<string>(Object.values(VENDOR_DOCUMENT_STATUS));

export class DocumentStatusVO extends BaseStatusVO<string> {
  static create(value: string): DocumentStatusVO {
    if (!VALID.has(value)) {
      throw new InvalidDocumentStatusError(value);
    }
    return new DocumentStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
