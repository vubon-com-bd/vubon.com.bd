/**
 * Payment Application Errors
 * @module payment-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class PaymentNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(paymentId: string) {
    super('Payment', paymentId);
    this.name = 'PaymentNotFoundApplicationError';
  }
}

export class PaymentInitiationError extends CommandError {
  constructor(reason: string, context?: Readonly<Record<string, unknown>>) {
    super(`Payment initiation failed: ${reason}`, 'PaymentInitiation', undefined);
    void context;
    this.name = 'PaymentInitiationError';
  }
}

export class PaymentProcessingError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(`Payment processing failed: ${reason}`, 'PaymentProcessing', undefined);
    void paymentId;
    this.name = 'PaymentProcessingError';
  }
}

export class PaymentCaptureError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(`Payment capture failed: ${reason}`, 'PaymentCapture', undefined);
    void paymentId;
    this.name = 'PaymentCaptureError';
  }
}

export class PaymentCancellationError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(`Payment cancellation failed: ${reason}`, 'PaymentCancellation', undefined);
    void paymentId;
    this.name = 'PaymentCancellationError';
  }
}

export class PaymentIdempotencyConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(key: string, existingPaymentId?: string) {
    super(
      `Idempotency key "${key}" already processed${existingPaymentId ? ` → payment ${existingPaymentId}` : ''}`,
      { key, existingPaymentId },
    );
    this.name = 'PaymentIdempotencyConflictError';
  }
}

export class PaymentGatewayUnavailableError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;
  constructor(gateway: string, reason?: string) {
    super(`Payment gateway "${gateway}" unavailable${reason ? `: ${reason}` : ''}`, {
      gateway,
      reason,
    });
    this.name = 'PaymentGatewayUnavailableError';
  }
}

export class PaymentGatewayRejectedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 402;
  constructor(gateway: string, reason: string, code?: string) {
    super(`Gateway "${gateway}" rejected: ${reason}`, { gateway, reason, code });
    this.name = 'PaymentGatewayRejectedError';
  }
}

export class PaymentValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'PaymentValidationError';
  }
}
