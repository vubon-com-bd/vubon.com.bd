/**
 * Notification delivery / provider domain errors
 * @module notification-service/domain/errors
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class InvalidDeliveryStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid delivery status "${value}". Allowed: ${allowed.join(', ')}`, 'deliveryStatus');
    this.name = 'InvalidDeliveryStatusError';
  }
}

export class InvalidDeliveryFailureReasonError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid delivery failure reason "${value}". Allowed: ${allowed.join(', ')}`,
      'failureReason',
    );
    this.name = 'InvalidDeliveryFailureReasonError';
  }
}

export class InvalidReadStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid read status "${value}". Allowed: ${allowed.join(', ')}`, 'readStatus');
    this.name = 'InvalidReadStatusError';
  }
}

export class DeliveryFailedError extends BusinessRuleError {
  constructor(reason: string) {
    super(`Delivery failed: ${reason}`, 'DELIVERY_FAILED', { reason });
    this.name = 'DeliveryFailedError';
  }
}

export class RetryExhaustedError extends BusinessRuleError {
  constructor(attempts: number) {
    super(`Retry exhausted after ${attempts} attempts`, 'RETRY_EXHAUSTED', { attempts });
    this.name = 'RetryExhaustedError';
  }
}

export class InvalidEmailProviderError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid email provider "${value}". Allowed: ${allowed.join(', ')}`, 'provider');
    this.name = 'InvalidEmailProviderError';
  }
}

export class InvalidSmsProviderError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid SMS provider "${value}". Allowed: ${allowed.join(', ')}`, 'provider');
    this.name = 'InvalidSmsProviderError';
  }
}

export class InvalidPushProviderError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid push provider "${value}". Allowed: ${allowed.join(', ')}`, 'provider');
    this.name = 'InvalidPushProviderError';
  }
}

export class InvalidPushPlatformError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid push platform "${value}". Allowed: ${allowed.join(', ')}`, 'platform');
    this.name = 'InvalidPushPlatformError';
  }
}

export class InvalidInAppTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid in-app type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidInAppTypeError';
  }
}

export class ProviderError extends BusinessRuleError {
  constructor(provider: string, message: string, code?: string) {
    super(
      `Provider "${provider}" error${code ? ` [${code}]` : ''}: ${message}`,
      'NOTIFICATION_PROVIDER_ERROR',
      { provider, code },
    );
    this.name = 'ProviderError';
  }
}
