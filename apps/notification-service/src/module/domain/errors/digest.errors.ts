/* istanbul ignore file -- pure error declarations */
/**
 * Digest Domain Errors
 * @module notification-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class DigestNotFoundError extends NotFoundError {
  constructor(digestId: string) {
    super('Digest', digestId);
    this.name = 'DigestNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidDigestStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid digest status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidDigestStatusError';
  }
}

export class InvalidDigestTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid digest type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidDigestTypeError';
  }
}

export class InvalidDigestPeriodError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid digest period: ${reason}`, 'period');
    this.name = 'InvalidDigestPeriodError';
  }
}

// ─── Business Rule (400) ───────────────────
export class DigestItemLimitExceededError extends BusinessRuleError {
  constructor(count: number, max: number) {
    super(
      `Digest item count ${count} exceeds maximum ${max}`,
      'DIGEST_ITEM_LIMIT_EXCEEDED',
      { count, max },
    );
    this.name = 'DigestItemLimitExceededError';
  }
}

export class DigestEmptyError extends BusinessRuleError {
  constructor(digestId: string) {
    super(
      `Digest "${digestId}" is empty — cannot be sent`,
      'DIGEST_EMPTY',
      { digestId },
    );
    this.name = 'DigestEmptyError';
  }
}

export class DigestCannotBeGeneratedError extends BusinessRuleError {
  constructor(digestId: string, reason: string) {
    super(
      `Digest "${digestId}" cannot be generated: ${reason}`,
      'DIGEST_CANNOT_BE_GENERATED',
      { digestId, reason },
    );
    this.name = 'DigestCannotBeGeneratedError';
  }
}
