/**
 * AbandonedCartId Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class AbandonedCartIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AbandonedCartIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('AbandonedCartId cannot be empty', 'abandonedCartId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('AbandonedCartId must be a valid UUID', 'abandonedCartId');
    }
    return new AbandonedCartIdVO(trimmed);
  }

  static reconstitute(raw: string): AbandonedCartIdVO {
    return new AbandonedCartIdVO(raw);
  }
}
