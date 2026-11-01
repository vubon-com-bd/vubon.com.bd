/**
 * IdempotencyKey Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - 16-128 chars
 * - URL-safe: A-Z a-z 0-9 _ -
 * - Immutable
 * - Used to prevent duplicate command processing
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 16;
const MAX_LENGTH = 128;
const KEY_PATTERN = /^[A-Za-z0-9_-]+$/;

export class IdempotencyKeyVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): IdempotencyKeyVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('IdempotencyKey must be a string', 'idempotencyKey');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `IdempotencyKey must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'idempotencyKey',
      );
    }
    if (!KEY_PATTERN.test(trimmed)) {
      throw new ValidationError(
        'IdempotencyKey must be URL-safe (A-Z, a-z, 0-9, "_", "-")',
        'idempotencyKey',
      );
    }
    return new IdempotencyKeyVO(trimmed);
  }

  static reconstitute(raw: string): IdempotencyKeyVO {
    return new IdempotencyKeyVO(raw);
  }

  get length(): number {
    return this.value.length;
  }
}
