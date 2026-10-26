/* istanbul ignore file -- pure error declarations */
/**
 * Rate Limit Domain Errors
 * @module notification-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Validation (422) ──────────────────────
export class InvalidRateLimitKeyError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid rate limit key: ${reason}`, 'rateLimitKey');
    this.name = 'InvalidRateLimitKeyError';
  }
}

export class InvalidRateLimitWindowError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid rate limit window: ${reason}`, 'window');
    this.name = 'InvalidRateLimitWindowError';
  }
}

// ─── Business Rule (400) ───────────────────
export class RateLimitExceededError extends BusinessRuleError {
  constructor(key: string, limit: number, window: string, resetAt?: string) {
    super(
      `Rate limit exceeded for "${key}": ${limit} per ${window}${resetAt ? `, resets at ${resetAt}` : ''}`,
      'RATE_LIMIT_EXCEEDED',
      { key, limit, window, resetAt },
    );
    this.name = 'RateLimitExceededError';
  }
}

export class RateLimitQuotaExceededError extends BusinessRuleError {
  constructor(key: string, quota: number, period: string) {
    super(
      `Rate limit quota exceeded for "${key}": ${quota} per ${period}`,
      'RATE_LIMIT_QUOTA_EXCEEDED',
      { key, quota, period },
    );
    this.name = 'RateLimitQuotaExceededError';
  }
}
