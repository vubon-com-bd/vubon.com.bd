/**
 * IdempotencyKey Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - 16-128 chars, alphanumeric + dash/underscore
 * - Used to prevent duplicate operations (create, cancel, etc.)
 * - Immutable
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 16;
const MAX_LENGTH = 128;
const PATTERN = /^[A-Za-z0-9_-]{16,128}$/;

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
    if (!PATTERN.test(trimmed)) {
      throw new ValidationError(
        'IdempotencyKey must be alphanumeric with dash/underscore',
        'idempotencyKey',
      );
    }
    return new IdempotencyKeyVO(trimmed);
  }

  static reconstitute(raw: string): IdempotencyKeyVO {
    return new IdempotencyKeyVO(raw);
  }

  static generate(): IdempotencyKeyVO {
    const random = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    return new IdempotencyKeyVO(random);
  }
}
