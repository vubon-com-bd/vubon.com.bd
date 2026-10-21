/**
 * Payment Gateway Domain Errors
 * @module payment-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class GatewayNotFoundError extends NotFoundError {
  constructor(gatewayId: string) {
    super('PaymentGateway', gatewayId);
    this.name = 'GatewayNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidGatewayStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid gateway status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidGatewayStatusError';
  }
}

export class InvalidGatewayTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid gateway type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidGatewayTypeError';
  }
}

// ─── Business Rule (400) ───────────────────
export class GatewayUnavailableError extends BusinessRuleError {
  constructor(gateway: string, reason?: string) {
    super(
      `Gateway "${gateway}" unavailable${reason ? `: ${reason}` : ''}`,
      'GATEWAY_UNAVAILABLE',
      { gateway, reason },
    );
    this.name = 'GatewayUnavailableError';
  }
}

export class GatewayInMaintenanceError extends BusinessRuleError {
  constructor(gateway: string) {
    super(`Gateway "${gateway}" is under maintenance`, 'GATEWAY_IN_MAINTENANCE', { gateway });
    this.name = 'GatewayInMaintenanceError';
  }
}

export class GatewayTimeoutError extends BusinessRuleError {
  constructor(gateway: string, timeoutMs: number) {
    super(
      `Gateway "${gateway}" timed out after ${timeoutMs}ms`,
      'GATEWAY_TIMEOUT',
      { gateway, timeoutMs },
    );
    this.name = 'GatewayTimeoutError';
  }
}

export class GatewaySignatureInvalidError extends ValidationError {
  constructor(gateway: string) {
    super(`Invalid signature from gateway "${gateway}"`, 'signature');
    this.name = 'GatewaySignatureInvalidError';
  }
}

export class UnsupportedCurrencyError extends BusinessRuleError {
  constructor(gateway: string, currency: string, supported: readonly string[]) {
    super(
      `Gateway "${gateway}" does not support currency "${currency}". Supported: ${supported.join(', ')}`,
      'UNSUPPORTED_CURRENCY',
      { gateway, currency, supported },
    );
    this.name = 'UnsupportedCurrencyError';
  }
}
