/**
 * DocumentId Value Object — UUID v4
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class DocumentIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DocumentIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Document ID must be a string', 'id');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('Document ID cannot be empty', 'id');
    }
    if (!UUID_PATTERN.test(trimmed)) {
      throw new ValidationError('Document ID must be a valid UUID', 'id');
    }
    return new DocumentIdVO(trimmed);
  }

  static reconstitute(raw: string): DocumentIdVO {
    return new DocumentIdVO(raw);
  }
}
