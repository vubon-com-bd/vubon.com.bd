/**
 * DigestId Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DigestIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DigestIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('DigestId cannot be empty', 'digestId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('DigestId must be a valid UUID', 'digestId');
    }
    return new DigestIdVO(trimmed);
  }

  static reconstitute(raw: string): DigestIdVO {
    return new DigestIdVO(raw);
  }
}
