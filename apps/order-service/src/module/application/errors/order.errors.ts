/**
 * Order Application Errors
 * @module order-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class OrderNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(orderId: string) {
    super('Order', orderId);
    this.name = 'OrderNotFoundApplicationError';
  }
}

export class OrderNumberNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(orderNumber: string) {
    super('Order by number', orderNumber);
    this.name = 'OrderNumberNotFoundApplicationError';
  }
}

export class OrderInitiationError extends CommandError {
  constructor(reason: string) {
    super(`Order initiation failed: ${reason}`, 'OrderInitiation');
    this.name = 'OrderInitiationError';
  }
}

export class OrderProcessingError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Order processing failed (${orderId}): ${reason}`, 'OrderProcessing');
    this.name = 'OrderProcessingError';
  }
}

export class OrderIdempotencyConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(key: string, existingId?: string) {
    super(
      `Idempotency key "${key}" already processed${existingId ? ` → ${existingId}` : ''}`,
      { key, existingId },
    );
    this.name = 'OrderIdempotencyConflictError';
  }
}

export class OrderServiceUnavailableError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;

  constructor(service: string, reason?: string) {
    super(
      `Order service "${service}" unavailable${reason ? `: ${reason}` : ''}`,
      { service, reason },
    );
    this.name = 'OrderServiceUnavailableError';
  }
}

export class OrderValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'OrderValidationError';
  }
}
