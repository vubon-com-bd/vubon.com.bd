/**
 * SuspensionId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class SuspensionIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SuspensionIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('SuspensionId cannot be empty', 'suspensionId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('SuspensionId must be a valid UUID', 'suspensionId');
    }
    return new SuspensionIdVO(trimmed);
  }

  static reconstitute(raw: string): SuspensionIdVO {
    return new SuspensionIdVO(raw);
  }
}
