/**
 * IdempotencyKey Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - 8-128 chars, printable ASCII (client-generated)
 * - Used to prevent duplicate side effects
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 8;
const MAX_LENGTH = 128;
const KEY_PATTERN = /^[!-~]+$/;

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
        'IdempotencyKey must be printable ASCII',
        'idempotencyKey',
      );
    }
    return new IdempotencyKeyVO(trimmed);
  }

  static reconstitute(raw: string): IdempotencyKeyVO {
    return new IdempotencyKeyVO(raw);
  }

  equalsKey(other: string): boolean {
    return this.value === other;
  }
}
