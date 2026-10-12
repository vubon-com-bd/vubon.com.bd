/**
 * IdempotencyKey Value Object
 * @module identity-service/domain/value-objects/primitives
 *
 * Prevents duplicate command execution for the same logical operation.
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class IdempotencyKeyVO extends BaseCodeVO {
  private static readonly MIN = 8;
  private static readonly MAX = 128;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): IdempotencyKeyVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('IdempotencyKey cannot be empty', 'idempotencyKey');
    }
    const normalized = raw.trim();
    if (normalized.length < IdempotencyKeyVO.MIN || normalized.length > IdempotencyKeyVO.MAX) {
      throw new ValidationError(
        `IdempotencyKey must be ${IdempotencyKeyVO.MIN}-${IdempotencyKeyVO.MAX} chars`,
        'idempotencyKey',
      );
    }
    if (!/^[A-Za-z0-9_.:-]+$/.test(normalized)) {
      throw new ValidationError(
        'IdempotencyKey contains invalid chars (allowed: A-Z a-z 0-9 _ . : -)',
        'idempotencyKey',
      );
    }
    return new IdempotencyKeyVO(normalized);
  }

  static reconstitute(raw: string): IdempotencyKeyVO {
    return new IdempotencyKeyVO(raw);
  }

  get masked(): string {
    if (this.value.length <= 12) return `${this.value.slice(0, 4)}****`;
    return `${this.value.slice(0, 6)}...${this.value.slice(-6)}`;
  }
}
