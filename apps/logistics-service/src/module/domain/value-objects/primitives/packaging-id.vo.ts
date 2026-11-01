/**
 * PackagingId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PackagingIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PackagingIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('PackagingId cannot be empty', 'packagingId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('PackagingId must be a valid UUID', 'packagingId');
    }
    return new PackagingIdVO(trimmed);
  }

  static reconstitute(raw: string): PackagingIdVO {
    return new PackagingIdVO(raw);
  }
}
