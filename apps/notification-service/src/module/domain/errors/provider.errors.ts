/* istanbul ignore file -- pure error declarations */
/**
 * Provider Domain Errors
 * @module notification-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class ProviderNotFoundError extends NotFoundError {
  constructor(providerName: string) {
    super('Provider', providerName);
    this.name = 'ProviderNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidProviderNameError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid provider name "${value}". Allowed: ${allowed.join(', ')}`, 'providerName');
    this.name = 'InvalidProviderNameError';
  }
}

// ─── Business Rule (400) ───────────────────
export class ProviderUnavailableError extends BusinessRuleError {
  constructor(providerName: string, reason: string) {
    super(
      `Provider "${providerName}" is unavailable: ${reason}`,
      'PROVIDER_UNAVAILABLE',
      { providerName, reason },
    );
    this.name = 'ProviderUnavailableError';
  }
}

export class ProviderQuotaExceededError extends BusinessRuleError {
  constructor(providerName: string, quota: number, period: string) {
    super(
      `Provider "${providerName}" quota exceeded: ${quota} per ${period}`,
      'PROVIDER_QUOTA_EXCEEDED',
      { providerName, quota, period },
    );
    this.name = 'ProviderQuotaExceededError';
  }
}

export class ProviderAuthenticationError extends BusinessRuleError {
  constructor(providerName: string) {
    super(
      `Provider "${providerName}" authentication failed`,
      'PROVIDER_AUTHENTICATION_FAILED',
      { providerName },
    );
    this.name = 'ProviderAuthenticationError';
  }
}

export class ProviderMessageRejectedError extends BusinessRuleError {
  constructor(providerName: string, reason: string) {
    super(
      `Provider "${providerName}" rejected message: ${reason}`,
      'PROVIDER_MESSAGE_REJECTED',
      { providerName, reason },
    );
    this.name = 'ProviderMessageRejectedError';
  }
}
