/**
 * DocumentId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DocumentIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DocumentIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('DocumentId cannot be empty', 'documentId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('DocumentId must be a valid UUID', 'documentId');
    }
    return new DocumentIdVO(trimmed);
  }

  static reconstitute(raw: string): DocumentIdVO {
    return new DocumentIdVO(raw);
  }
}
