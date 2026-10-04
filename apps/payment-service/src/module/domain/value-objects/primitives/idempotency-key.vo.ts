/**
 * IdempotencyKey Value Object — 8..128 chars
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN = 8;
const MAX = 128;
const PATTERN = /^[A-Za-z0-9_\-:.]+$/;

export class IdempotencyKeyVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): IdempotencyKeyVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Idempotency key must be a string', 'idempotencyKey');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN || trimmed.length > MAX) {
      throw new ValidationError(
        `Idempotency key must be ${MIN}-${MAX} characters`,
        'idempotencyKey',
      );
    }
    if (!PATTERN.test(trimmed)) {
      throw new ValidationError(
        'Idempotency key may contain only A-Z, a-z, 0-9, _, -, :, .',
        'idempotencyKey',
      );
    }
    return new IdempotencyKeyVO(trimmed);
  }

  static reconstitute(raw: string): IdempotencyKeyVO {
    return new IdempotencyKeyVO(raw);
  }
}
