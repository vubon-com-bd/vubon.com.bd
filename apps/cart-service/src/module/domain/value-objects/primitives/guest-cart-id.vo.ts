/**
 * GuestCartId Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class GuestCartIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): GuestCartIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('GuestCartId cannot be empty', 'guestCartId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('GuestCartId must be a valid UUID', 'guestCartId');
    }
    return new GuestCartIdVO(trimmed);
  }

  static reconstitute(raw: string): GuestCartIdVO {
    return new GuestCartIdVO(raw);
  }
}
