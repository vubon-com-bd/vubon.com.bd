/**
 * ReturnId Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ReturnIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ReturnIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ReturnId cannot be empty', 'returnId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('ReturnId must be a valid UUID', 'returnId');
    }
    return new ReturnIdVO(trimmed);
  }

  static reconstitute(raw: string): ReturnIdVO { return new ReturnIdVO(raw); }
}
