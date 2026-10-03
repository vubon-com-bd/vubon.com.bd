/**
 * Order Application Errors
 * @module order-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class OrderNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(orderId: string) {
    super('Order', orderId);
    this.name = 'OrderNotFoundApplicationError';
  }
}

export class OrderCreationError extends CommandError {
  constructor(reason: string, context?: Readonly<Record<string, unknown>>) {
    super(`Order creation failed: ${reason}`, 'OrderCreation', undefined);
    void context;
    this.name = 'OrderCreationError';
  }
}

export class OrderUpdateError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Order update failed: ${reason}`, 'OrderUpdate', undefined);
    void orderId;
    this.name = 'OrderUpdateError';
  }
}

export class OrderDeleteError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Order delete failed: ${reason}`, 'OrderDelete', undefined);
    void orderId;
    this.name = 'OrderDeleteError';
  }
}

export class OrderNumberConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(orderNumber: string) {
    super(`Order number already exists: ${orderNumber}`, { orderNumber });
    this.name = 'OrderNumberConflictError';
  }
}

export class OrderIdempotencyConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(key: string) {
    super(`Idempotency key already processed: ${key}`, { key });
    this.name = 'OrderIdempotencyConflictError';
  }
}

export class OrderValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'OrderValidationError';
  }
}
