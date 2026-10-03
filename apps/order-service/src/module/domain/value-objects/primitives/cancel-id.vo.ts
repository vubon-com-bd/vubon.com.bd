/**
 * CancelId Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CancelIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): CancelIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CancelId cannot be empty', 'cancelId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('CancelId must be a valid UUID', 'cancelId');
    }
    return new CancelIdVO(trimmed);
  }

  static reconstitute(raw: string): CancelIdVO { return new CancelIdVO(raw); }
}
