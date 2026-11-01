/**
 * Payment Method Domain Errors
 * @module payment-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class PaymentMethodNotFoundError extends NotFoundError {
  constructor(methodId: string) {
    super('PaymentMethod', methodId);
    this.name = 'PaymentMethodNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidPaymentMethodTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid payment method type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidPaymentMethodTypeError';
  }
}

export class InvalidPaymentMethodError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid payment method "${value}". Allowed: ${allowed.join(', ')}`, 'method');
    this.name = 'InvalidPaymentMethodError';
  }
}

// ─── Business Rule (400) ───────────────────
export class PaymentMethodNotSupportedError extends BusinessRuleError {
  constructor(method: string, context?: Readonly<Record<string, unknown>>) {
    super(`Payment method "${method}" not supported`, 'PAYMENT_METHOD_NOT_SUPPORTED', {
      method,
      ...context,
    });
    this.name = 'PaymentMethodNotSupportedError';
  }
}

export class PaymentMethodInactiveError extends BusinessRuleError {
  constructor(method: string) {
    super(`Payment method "${method}" is inactive`, 'PAYMENT_METHOD_INACTIVE', { method });
    this.name = 'PaymentMethodInactiveError';
  }
}

export class PaymentMethodRequiresGatewayError extends BusinessRuleError {
  constructor(method: string) {
    super(
      `Payment method "${method}" requires a gateway`,
      'PAYMENT_METHOD_REQUIRES_GATEWAY',
      { method },
    );
    this.name = 'PaymentMethodRequiresGatewayError';
  }
}
