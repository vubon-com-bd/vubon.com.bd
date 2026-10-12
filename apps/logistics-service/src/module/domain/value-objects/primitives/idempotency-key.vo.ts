/**
 * IdempotencyKey Value Object — safe for repeated operations
 * @module logistics-service/domain/value-objects/primitives
 */
import { randomUUID } from 'node:crypto';
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class IdempotencyKeyVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static generate(): IdempotencyKeyVO { return new IdempotencyKeyVO(randomUUID()); }

  static create(raw: string): IdempotencyKeyVO {
    if (typeof raw !== 'string' || raw.trim().length < 8) {
      throw new ValidationError('IdempotencyKey must be at least 8 chars', 'idempotencyKey');
    }
    const trimmed = raw.trim();
    if (trimmed.length > 255) {
      throw new ValidationError('IdempotencyKey too long (max 255)', 'idempotencyKey');
    }
    return new IdempotencyKeyVO(trimmed);
  }

  static reconstitute(raw: string): IdempotencyKeyVO { return new IdempotencyKeyVO(raw); }

  isUuid(): boolean { return REGEX.UUID.test(this.value); }
}
