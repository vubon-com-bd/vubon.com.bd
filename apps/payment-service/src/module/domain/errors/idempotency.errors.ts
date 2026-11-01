/**
 * Idempotency Domain Errors
 * @module payment-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Conflict (409) ────────────────────────
export class IdempotencyConflictError extends ConflictError {
  constructor(idempotencyKey: string, existingId: string) {
    super(
      `Idempotency key "${idempotencyKey}" already used for "${existingId}"`,
      'idempotencyKey',
    );
    this.name = 'IdempotencyConflictError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidIdempotencyKeyError extends ValidationError {
  constructor(value: string) {
    super(`Invalid idempotency key "${value}" (must be 8-128 chars)`, 'idempotencyKey');
    this.name = 'InvalidIdempotencyKeyError';
  }
}

// ─── Business Rule (400) ───────────────────
export class IdempotencyKeyExpiredError extends BusinessRuleError {
  constructor(idempotencyKey: string, ttlSeconds: number) {
    super(
      `Idempotency key "${idempotencyKey}" expired (TTL: ${ttlSeconds}s)`,
      'IDEMPOTENCY_KEY_EXPIRED',
      { idempotencyKey, ttlSeconds },
    );
    this.name = 'IdempotencyKeyExpiredError';
  }
}

export class IdempotencyResultMismatchError extends BusinessRuleError {
  constructor(idempotencyKey: string) {
    super(
      `Idempotency key "${idempotencyKey}" previously used with different payload`,
      'IDEMPOTENCY_RESULT_MISMATCH',
      { idempotencyKey },
    );
    this.name = 'IdempotencyResultMismatchError';
  }
}
